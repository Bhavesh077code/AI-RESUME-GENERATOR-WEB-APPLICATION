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





/*
import { Resume } from "../../module/resumeAllModule/resumeModel.js";
import { Template } from "../../module/resumeAllModule/templateModel.js";

import { loadTemplate } from "../../utils/templateLoader.js";
import { generatePDF } from "../../utils/pdfGenerator.js";

export const createResume = async (req, res) => {
  try {
    // =====================================================
    // USER
    // =====================================================

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    // =====================================================
    // REQUEST DATA
    // =====================================================

    const { title, content, templateSlug } = req.body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!title || !templateSlug || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, content, templateSlug are required",
      });
    }

    // =====================================================
    // PARSE CONTENT SAFELY
    // =====================================================

    let parsedContent;

    try {
      if (typeof content === "string") {
        parsedContent = JSON.parse(content);
      } else {
        parsedContent = content;
      }
    } catch (error) {
      console.error("CONTENT JSON ERROR:", error);

      return res.status(400).json({
        success: false,
        message: "Invalid JSON in content",
      });
    }

    // Make sure content is an object
    if (
      !parsedContent ||
      typeof parsedContent !== "object" ||
      Array.isArray(parsedContent)
    ) {
      return res.status(400).json({
        success: false,
        message: "Content must be a valid object",
      });
    }

    // =====================================================
    // SAFE CONTENT
    // =====================================================

    const safeContent = {
      fullName: String(parsedContent?.fullName || ""),
      email: String(parsedContent?.email || ""),
      phone: String(parsedContent?.phone || ""),
      location: String(parsedContent?.location || ""),
      summary: String(parsedContent?.summary || ""),

      experience: Array.isArray(parsedContent?.experience)
        ? parsedContent.experience
        : [],

      education: Array.isArray(parsedContent?.education)
        ? parsedContent.education
        : [],

      project: Array.isArray(parsedContent?.project)
        ? parsedContent.project
        : [],

      certification: Array.isArray(parsedContent?.certification)
        ? parsedContent.certification
        : [],

      skills: Array.isArray(parsedContent?.skills)
        ? parsedContent.skills
        : [],

      languages: Array.isArray(parsedContent?.languages)
        ? parsedContent.languages
        : [],

      image: req.file?.path || "",

      links: {
        linkedin: String(parsedContent?.links?.linkedin || ""),
        github: String(parsedContent?.links?.github || ""),
        website: String(parsedContent?.links?.website || ""),
      },
    };

    // =====================================================
    // FIND TEMPLATE
    // =====================================================

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

    // =====================================================
    // CHECK TEMPLATE DATA
    // =====================================================

    if (!template.category) {
      return res.status(500).json({
        success: false,
        message: "Template category is missing",
      });
    }

    if (!template.htmlFile) {
      return res.status(500).json({
        success: false,
        message: "Template htmlFile is missing",
      });
    }

    console.log("=================================");
    console.log("TEMPLATE CATEGORY:", template.category);
    console.log("TEMPLATE HTML FILE:", template.htmlFile);
    console.log("=================================");

    // =====================================================
    // CREATE RESUME
    // =====================================================

    const resume = await Resume.create({
      userId,
      title: String(title),

      templateId: template._id,
      templateSlug: template.slug,

      content: safeContent,
    });

    // =====================================================
    // LOAD TEMPLATE SAFELY
    // =====================================================

    let templateModule;

    try {
      templateModule = await loadTemplate(
        template.category,
        template.htmlFile
      );
    } catch (error) {
      console.error("TEMPLATE LOAD ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to load resume template",
        error: error.message,
      });
    }

    // =====================================================
    // CHECK TEMPLATE MODULE
    // =====================================================

    if (!templateModule) {
      return res.status(500).json({
        success: false,
        message: "Template module is empty",
      });
    }

    console.log(
      "AVAILABLE TEMPLATE EXPORTS:",
      Object.keys(templateModule)
    );

    // =====================================================
    // GET TEMPLATE FUNCTION
    // =====================================================

    let templateFunction = templateModule[template.htmlFile];

    
      Some ES modules may return default export.
      So check default also.
    

    if (
      typeof templateFunction !== "function" &&
      typeof templateModule.default === "function"
    ) {
      templateFunction = templateModule.default;
    }

    // =====================================================
    // TEMPLATE FUNCTION CHECK
    // =====================================================

    if (typeof templateFunction !== "function") {
      return res.status(500).json({
        success: false,
        message: "Resume template render function not found",

        template: {
          category: template.category,
          htmlFile: template.htmlFile,
        },

        availableExports: Object.keys(templateModule),
      });
    }

    // =====================================================
    // RENDER HTML
    // =====================================================

    let html;

    try {
      html = templateFunction(safeContent);
    } catch (error) {
      console.error("TEMPLATE RENDER ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Error while rendering resume template",
        error: error.message,
      });
    }

    // =====================================================
    // CHECK GENERATED HTML
    // =====================================================

    if (!html || typeof html !== "string") {
      return res.status(500).json({
        success: false,
        message: "Template did not generate valid HTML",
      });
    }

    if (!html.trim()) {
      return res.status(500).json({
        success: false,
        message: "Generated HTML is empty",
      });
    }

    console.log("HTML GENERATED SUCCESSFULLY");
    console.log("HTML LENGTH:", html.length);

    // =====================================================
    // GENERATE PDF
    // =====================================================

    let pdfUrl;

    try {
      pdfUrl = await generatePDF(html);
    } catch (error) {
      console.error("PDF GENERATION ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Error generating PDF",
        error: error.message,
      });
    }

    // =====================================================
    // CHECK PDF URL
    // =====================================================

    if (!pdfUrl) {
      return res.status(500).json({
        success: false,
        message: "PDF URL was not generated",
      });
    }

    // =====================================================
    // SAVE PDF URL
    // =====================================================

    resume.pdfUrl = pdfUrl;

    await resume.save();

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

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
    // =====================================================
    // FINAL ERROR HANDLER
    // =====================================================


    console.error("CREATE RESUME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating resume",
      error: error.message,
    });
  }
};

*/

/*
import { Resume } from "../../module/resumeallmodule/resumeModel.js";
import { Template } from "../../module/resumeAllModule/templateModel.js";

import { loadTemplate } from "../../utils/templateLoader.js";
import { generatePDF } from "../../utils/pdfGenerator.js";


// This controller is responsible for creating a complete resume for the logged-in user.
// It receives resume information from the frontend, validates the submitted data,
// checks whether the selected template exists and is active, safely converts the
// resume content from JSON text into a JavaScript object, and stores the resume
// information in the database. It also handles an optional profile image uploaded
// by the user. After creating the resume, the controller loads the selected HTML
// template, inserts the user's resume content into that template, generates a PDF
// from the resulting HTML, saves the generated PDF URL in the resume document,
// and finally sends a success response containing the important resume details.
// If any step fails, the catch block handles the error and returns an appropriate
// server error response. Overall, this controller connects the frontend resume
// form, database, template system, image upload, HTML generation, and PDF generation
// into one complete resume creation process.

export const createResume = async (req, res) => {
  try {

    // Get the ID of the currently authenticated user.
    // This is used to associate the newly created resume with its owner.
    const userId = req.user.id;


    // Get the resume title, resume content, and selected template slug
    // from the request body sent by the frontend.
    let { title, content, templateSlug } = req.body;


    // -------------------- VALIDATION --------------------
    // Check whether all required resume information has been provided.
    // If title, content, or templateSlug is missing, the request is rejected.
    if (!title || !templateSlug || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, content, templateSlug are required",
      });
    }


    // -------------------- PARSE JSON --------------------
    // The resume content is received as JSON text, so it needs to be
    // converted into a JavaScript object before it can be stored properly.
    let parsedContent;

    try {
      parsedContent = JSON.parse(content);
    } catch (err) {

      // If the received content is not valid JSON,
      // return a 400 Bad Request response.
      return res.status(400).json({
        success: false,
        message: "Invalid JSON in content",
      });
    }


    // -------------------- FIND TEMPLATE --------------------
    // Search the database for the template selected by the user.
    // isActive: true ensures that only currently available templates
    // can be used to create a resume.
    const template = await Template.findOne({
      slug: templateSlug,
      isActive: true,
    });


    // If the selected template does not exist or is inactive,
    // stop the process and return a 404 response.
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }


    // -------------------- IMAGE URL --------------------
    // Get the uploaded image URL from req.file.
    // If no image was uploaded, an empty string is used.
    const imageUrl = req.file?.path || "";


    // -------------------- CREATE RESUME --------------------
    // Create the resume document in the database.
    // The PDF is not generated at this stage because the resume
    // data needs to exist first.
    const resume = await Resume.create({
      userId,
      title,

      // Store the database ID of the selected template.
      templateId: template._id,

      // Store the template slug for future reference.
      templateSlug: template.slug,

      // Store the user's resume information in a structured format.
      content: {

        // Personal information
        fullName: parsedContent?.fullName || "",
        email: parsedContent?.email || "",
        phone: parsedContent?.phone || "",
        location: parsedContent?.location || "",

        // Professional summary
        summary: parsedContent?.summary || "",

        // Resume sections
        experience: parsedContent?.experience || [],
        education: parsedContent?.education || [],
        project: parsedContent?.project || [],
        certification: parsedContent?.certification || [],
        skills: parsedContent?.skills || [],
        languages: parsedContent?.languages || [],

        // Uploaded profile image
        image: imageUrl,

        // Social and professional links
        links: {
          linkedin: parsedContent?.links?.linkedin || "",
          github: parsedContent?.links?.github || "",
          website: parsedContent?.links?.website || "",
        },
      },
    });


    // -------------------- LOAD TEMPLATE --------------------
    // Load the HTML template according to its category and HTML file.
    // This template contains the design and structure of the resume.
    const module = await loadTemplate(
      template.category,
      template.htmlFile
    );


    // -------------------- GENERATE HTML --------------------
    // Pass the saved resume content to the selected template function.
    // The function combines the resume data with the template design
    // and produces the final HTML version of the resume.
    const html = module[template.htmlFile](resume.content);


    // -------------------- GENERATE PDF --------------------
    // Convert the generated HTML into a PDF file.
    // The function returns the URL or location of the generated PDF.
    const pdfUrl = await generatePDF(html);


    // -------------------- SAVE PDF URL --------------------
    // Store the generated PDF URL inside the resume document
    // so that it can be accessed or downloaded later.
    resume.pdfUrl = pdfUrl;

    await resume.save();


    // -------------------- RESPONSE --------------------
    // Send a successful response to the frontend.
    // Only the required resume information is returned instead of
    // sending the entire database document.
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

    // -------------------- ERROR HANDLING --------------------
    // If any unexpected error occurs during validation, database operations,
    // template loading, HTML generation, or PDF generation, the error is
    // caught here and a 500 Internal Server Error response is returned.
    return res.status(500).json({
      success: false,
      message: "Error creating resume",
      error: error.message,
    });
  }
};

*/