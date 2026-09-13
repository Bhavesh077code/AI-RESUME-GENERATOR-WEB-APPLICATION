import { Resume } from "../../module/resumeAllModule/resumeModel.js";
import { Template } from "../../module/resumeAllModule/templateModel.js";
import { loadTemplate } from "../../utils/templateLoader.js";
import { generatePDF } from "../../utils/pdfGenerator.js";

const parseContent = (value) => {
  if (!value) return {};
  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    throw new Error("Invalid JSON in content");
  }
};

export const createResume = async (req, res) => {
  let resume = null;

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const title = String(req.body.title || "").trim();
    const templateSlug = String(req.body.templateSlug || "").trim().toLowerCase();
    const content = parseContent(req.body.content);

    if (!title || !templateSlug || !content || typeof content !== "object") {
      return res.status(400).json({
        success: false,
        message: "Title, content and templateSlug are required",
      });
    }

    // The slug is the only template identifier the frontend needs to send.
    const template = await Template.findOne({
      slug: templateSlug,
      isActive: true,
    }).lean();

    if (!template) {
      return res.status(404).json({
        success: false,
        message: `Template '${templateSlug}' not found or inactive`,
      });
    }

    if (!template.category || !template.htmlFile) {
      return res.status(500).json({
        success: false,
        message: "Selected template is missing category or htmlFile configuration",
      });
    }

    const safeContent = {
      fullName: String(content.fullName || ""),
      email: String(content.email || ""),
      phone: String(content.phone || ""),
      location: String(content.location || ""),
      summary: String(content.summary || ""),
      experience: Array.isArray(content.experience) ? content.experience : [],
      education: Array.isArray(content.education) ? content.education : [],
      project: Array.isArray(content.project)
        ? content.project
        : Array.isArray(content.projects)
          ? content.projects
          : [],
      certification: Array.isArray(content.certification)
        ? content.certification
        : Array.isArray(content.certifications)
          ? content.certifications
          : [],
      skills: Array.isArray(content.skills) ? content.skills : [],
      languages: Array.isArray(content.languages) ? content.languages : [],
      links: {
        github: content.links?.github || "",
        linkedin: content.links?.linkedin || "",
        portfolio: content.links?.portfolio || "",
        twitter: content.links?.twitter || "",
        website: content.links?.website || "",
      },
      image: req.file?.path || content.image || "",
    };

    // Save the resume first so the user does not lose form data if PDF generation
    // is temporarily unavailable. pdfUrl is filled after PDF generation.
    resume = await Resume.create({
      userId,
      title,
      templateId: template._id,
      templateSlug: template.slug,
      content: safeContent,
    });

    const templateModule = await loadTemplate(
      template.category,
      template.htmlFile,
    );

    const templateFunction =
      templateModule?.default ||
      templateModule?.[template.htmlFile];

    if (typeof templateFunction !== "function") {
      throw new Error(
        `Template render function not found: ${template.category}/${template.htmlFile}.js`,
      );
    }

    const html = templateFunction(resume.content);

    if (typeof html !== "string" || !html.trim()) {
      throw new Error("Template generated empty HTML");
    }

    const pdfUrl = await generatePDF(html);

    resume.pdfUrl = pdfUrl;
    await resume.save();

    return res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume: {
        _id: resume._id,
        title: resume.title,
        templateSlug: resume.templateSlug,
        pdfUrl: resume.pdfUrl,
      },
    });
  } catch (error) {
    console.error("CREATE RESUME ERROR:", error);

    if (resume?._id) {
      try {
        await Resume.findByIdAndDelete(resume._id);
      } catch (cleanupError) {
        console.error("RESUME CLEANUP ERROR:", cleanupError.message);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Error creating resume",
      error: error.message || "Unknown server error",
    });
  }
};
