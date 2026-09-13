
import { Resume } from "../../module/resumeAllModule/resumeModel.js";
import { Template } from "../../module/resumeAllModule/templateModel.js";
import { loadTemplate } from "../../utils/templateLoader.js";
import { generatePDF } from "../../utils/pdfGenerator.js";

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

    const { title, templateSlug } = req.body;
    let { content } = req.body;

    if (!title || !templateSlug || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, content and templateSlug are required",
      });
    }

    if (typeof content === "string") {
      try {
        content = JSON.parse(content);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in content",
        });
      }
    }

    if (!content || typeof content !== "object") {
      return res.status(400).json({
        success: false,
        message: "content must be a valid object",
      });
    }

    const template = await Template.findOne({
      slug: String(templateSlug).trim(),
      isActive: true,
    }).lean();

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found or inactive",
      });
    }

    const safeContent = {
      ...content,
      fullName: content.fullName || "",
      email: content.email || "",
      phone: content.phone || "",
      location: content.location || "",
      summary: content.summary || "",
      experience: Array.isArray(content.experience) ? content.experience : [],
      education: Array.isArray(content.education) ? content.education : [],
      project: Array.isArray(content.project)
        ? content.project
        : Array.isArray(content.projects)
          ? content.projects
          : [],
      certification: Array.isArray(content.certification)
        ? content.certification
        : [],
      skills: Array.isArray(content.skills) ? content.skills : [],
      languages: Array.isArray(content.languages) ? content.languages : [],
      links: {
        linkedin: content.links?.linkedin || "",
        github: content.links?.github || "",
        website: content.links?.website || "",
      },
      image: req.file?.path || content.image || "",
    };

    resume = await Resume.create({
      userId,
      title: String(title).trim(),
      templateId: template._id,
      templateSlug: template.slug,
      content: safeContent,
    });

    const templateModule = await loadTemplate(
      template.category,
      template.htmlFile
    );

    const templateFunction =
      templateModule?.default ||
      templateModule?.[template.htmlFile];

    if (typeof templateFunction !== "function") {
      throw new Error(
        `Template render function not found. category=${template.category}, htmlFile=${template.htmlFile}, exports=${Object.keys(templateModule || {}).join(",")}`
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

    // Do not leave a DB record behind when PDF generation fails.
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
      error: error.message,
    });
  }
};




























/*
import { Resume } from "../../module/resumeallmodule/resumeModel.js"
import { Template } from "../../module/resumeAllModule/templateModel.js"

import { loadTemplate } from "../../utils/templateLoader.js"
import { generatePDF } from "../../utils/pdfGenerator.js"

export const createResume = async (req, res) => {
  try {
    const userId = req.user.id
    const { title, content,  templateSlug } = req.body


    // 1. VALIDATION
    if (!title || !templateSlug) {
      return res.status(400).json({
        message: "Title and templateSlug required"
      })
    }

    // 2. FIND TEMPLATE
    const template = await Template.findOne({
      slug: templateSlug,
      isActive: true
    })

    if (!template) {
      return res.status(404).json({
        message: "Template not found"
      })
    }

  
    const imageUrl = req.file?.path || "";

    console.log("FILE:", req.file)
    console.log("IMAGE URL:", imageUrl)

    // 3. SAVE RESUME IN DB 💾 (IMPORTANT PART)
    const resume = await Resume.create({
      userId,
      title,
      templateSlug,
      content: {
        fullName: content?.fullName || "",
        email: content?.email || "",
        phone: content?.phone || "",
        location: content?.location || "",
        summary: content?.summary || "",
        experience: content?.experience || [],
        education: content?.education || [],
        project: content?.project || [],
        certification: content?.certification || [],
        skills: content?.skills || [],
        languages: content?.languages || [],
        image: imageUrl,
        links: {
          linkedin: content?.links?.linkedin || null,
          github: content?.links?.github || null,
          website: content?.links?.website || null
        }
      }
    })

    // 4. LOAD TEMPLATE FILE
    const module = await loadTemplate(
      template.category,
      template.htmlFile
    )

    console.log("TEMPLATE:", template);
    console.log("HTML FILE KEY:", template.htmlFile);
    console.log("MODULE:", module);

    // 5. GENERATE HTML
    const html = module[template.htmlFile](resume.content)

    // 6. GENERATE PDF
    const pdfBuffer = await generatePDF(html)

    // 7. SEND PDF RESPONSE
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=${title}.pdf`
    })

    return res.send(pdfBuffer)

  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: "Error creating resume"
    })
  }
}
*/

/*
import { Resume } from "../../module/resumeallmodule/resumeModel.js"
import { Template } from "../../module/resumeAllModule/templateModel.js"

import { loadTemplate } from "../../utils/templateLoader.js"
import { generatePDF } from "../../utils/pdfGenerator.js"

export const createResume = async (req, res) => {
  try {

    const userId = req.user.id
    const { title, templateSlug } = req.body

    // 🔥 VALIDATION
    if (title || templateSlug) {
      return res.status(400).json({
        message: "Title and templateSlug required"
      })
    }

    // 🔥 FIX: content parsing (IMPORTANT)
    const parsedContent =
      typeof req.body.content === "string"
        ? JSON.parse(req.body.content)
        : req.body.content || {}

    // 🔥 IMAGE URL (Cloudinary)
    const imageUrl = req.file?.path || ""

    //console.log("FILE:", req.file)
   // console.log("CONTENT:", parsedContent)
    //console.log("IMAGE URL:", imageUrl)

    // 🔥 FIND TEMPLATE
    const template = await Template.findOne({
      slug: templateSlug,
      isActive: true
    })

    if (!template) {
      return res.status(404).json({
        message: "Template not found"
      })
    }

    // 🔥 SAVE RESUME
    const resume = await Resume.create({
      userId,
      title,
      templateSlug,

      content: {
        ...parsedContent,   // 🔥 MAIN FIX
        image: imageUrl
      }
    })

    // 🔥 LOAD TEMPLATE
    const module = await loadTemplate(
      template.category,
      template.htmlFile
    )

    // 🔥 GENERATE HTML
    const html = module[template.htmlFile](resume.content)

    // 🔥 GENERATE PDF
    const pdfBuffer = await generatePDF(html)

    // 🔥 RESPONSE
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=${title}.pdf`
    })

    return res.send(pdfBuffer);

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Error creating resume"
    })
  }
}
*/


/*
import { Resume } from "../../module/resumeAllModule/resumeModel.js";
import { Template } from "../../module/resumeAllModule/templateModel.js";

import { loadTemplate } from "../../utils/templateLoader.js";
import { generatePDF } from "../../utils/pdfGenerator.js";

export const createResume = async (req, res) => {
  try {
    const userId = req.user.id;

    let { title, content, templateSlug } = req.body;

    // VALIDATION
    if (!title || !templateSlug || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, content, templateSlug are required",
      });
    }

    // Parse JSON safely
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON in content",
      });
    }

    // FIND TEMPLATE
    const template = await Template.findOne({
      slug: templateSlug,
      isActive: true,
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    const imageUrl = req.file?.path || "";

    // CREATE RESUME (without pdf first)
    const resume = await Resume.create({
      userId,
      title,
      templateId: template._id,
      templateSlug: template.slug,
      content: {
        fullName: parsedContent?.fullName || "",
        email: parsedContent?.email || "",
        phone: parsedContent?.phone || "",
        location: parsedContent?.location || "",
        summary: parsedContent?.summary || "",

        experience: parsedContent?.experience || [],
        education: parsedContent?.education || [],
        project: parsedContent?.project || [],
        certification: parsedContent?.certification || [],
        skills: parsedContent?.skills || [],
        languages: parsedContent?.languages || [],

        image: imageUrl,

        links: {
          linkedin: parsedContent?.links?.linkedin || "",
          github: parsedContent?.links?.github || "",
          website: parsedContent?.links?.website || "",
        },
      },
    });
    

    // LOAD TEMPLATE
    const module = await loadTemplate(template.category, template.htmlFile);

    const html = module[template.htmlFile](resume.content);

    // GENERATE PDF
    const pdfUrl = await generatePDF(html);

    // SAVE PDF URL
    resume.pdfUrl = pdfUrl;
    await resume.save();

    // RESPONSE (ONLY JSON)
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

    return res.status(500).json({
      success: false,
      message: "Error creating resume",
      error: error.message,
    });
  }
};


*/
