
/*
import { loadTemplate } from "../../utils/templateLoader.js";

export const generateResumePreview = async (req, res) => {
  try {
    const { category, slug, data } = req.body;

    if (!category || !slug) {
      return res.status(400).json({
        success: false,
        message: "Category and slug are required",
      });
    }

    const templateModule = await loadTemplate(category, slug);

    const templateFunction = templateModule.default;

    if (!templateFunction) {
      return res.status(404).json({
        success: false,
        message: "Template function not found",
      });
    }

    const html = templateFunction(data);

    return res.status(200).json({
      success: true,
      html,
    });

  } catch (error) {
    console.error("Preview Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

*/


/*
import { Template } from "../../module/resumeAllModule/templateModel.js";
import { loadTemplate } from "../../utils/templateLoader.js";

export const generateResumePreview = async (req, res) => {
    try {
        const { slug, data } = req.body;

        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Slug is required",
            });
        }

        // 🔥 GET TEMPLATE FROM DB
        const template = await Template.findOne({ slug, isActive: true });

        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found in DB",
            });
        }

        const { category, htmlFile } = template;

        console.log("Category:", category);
        console.log("File:", htmlFile);

        // 🔥 LOAD FILE FROM DISK
        const templateModule = await loadTemplate(category, htmlFile);

        const templateFunction =
            templateModule.default || templateModule[htmlFile];

        if (!templateFunction) {
            return res.status(500).json({
                success: false,
                message: "Template function not found inside file",
            });
        }

        const html = templateFunction(data || {});

        return res.status(200).json({
            success: true,
            html,
        });

    } catch (error) {
        console.error("Preview Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
*/


import { Template } from "../../module/resumeAllModule/templateModel.js";
import { loadTemplate } from "../../utils/templateLoader.js";

export const generateResumePreview = async (req, res) => {
  try {
    const { slug, data } = req.body;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "slug is required",
      });
    }

    // 🔥 STEP 1: DB se template find karo
    const templateDoc = await Template.findOne({ slug, isActive: true });

    if (!templateDoc) {
      return res.status(404).json({
        success: false,
        message: "Template not found in database",
      });
    }

    console.log("DB Template:", templateDoc);

    const { category, htmlFile } = templateDoc;

    // 🔥 STEP 2: correct file load karo
    const templateModule = await loadTemplate(category, htmlFile);

    // dynamic function (safe fallback)
    const templateFunction =
      templateModule.default ||
      templateModule[htmlFile] ||
      templateModule;

    if (typeof templateFunction !== "function") {
      return res.status(500).json({
        success: false,
        message: "Template function not found or invalid export",
      });
    }

    // 🔥 STEP 3: HTML generate
    const html = templateFunction(data || {});

    return res.status(200).json({
      success: true,
      html,
    });

  } catch (error) {
    console.error("Preview Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};