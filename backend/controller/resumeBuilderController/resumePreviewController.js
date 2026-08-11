
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


// This controller is used to generate a live preview of a resume based on the template selected by the user.
//  First, it receives the template slug and resume data from the request body, where the slug identifies which resume template should be used and the data contains the information that needs to be displayed in the preview.
//  The controller first checks whether the slug is provided, and if it is missing, it returns a 400 Bad Request response because a template cannot be selected without its slug. After that, it searches the database for an active template using the provided slug, and if no matching template is found, it returns a 404 response.
//  Once the template is found, its category and HTML file name are extracted and passed to the loadTemplate function, which loads the correct template file dynamically. The controller then identifies the template function using a safe fallback approach by checking the default export, the function matching the HTML file name, or the complete module itself. It also verifies that the selected value is actually a function; if it is not a valid function, the controller returns a 500 error indicating that the template cannot be used.
//  If everything is valid, the resume data is passed to the template function, which combines the user's data with the template's design and generates the final HTML content.
//  Finally, the generated HTML is returned to the frontend in a successful 200 response so that the frontend can display the resume preview to the user without permanently creating or saving the resume.
//  If any unexpected error occurs while finding the template, loading the template, or generating the HTML, the catch block logs the error and returns a 500 server error response.
//  Overall, this API acts as a dynamic resume preview system that allows users to see how their resume information will look inside a selected template before saving or downloading the final resume.



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