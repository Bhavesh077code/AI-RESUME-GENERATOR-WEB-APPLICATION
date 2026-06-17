
import { Resume } from "../../module/resumeallmodule/resumeModel.js";
import slugify from "slugify";

// publish resume
export const publishResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // generate slug
    let slug = slugify(resume.title, {
      lower: true,
      strict: true,
    });

    // make unique slug
    const existingSlug = await Resume.findOne({
      publicSlug: slug,
    });

    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
      message = "Slug already exists, using unique slug";
    }

    resume.isPublic = true;
    resume.publicSlug = slug;

    await resume.save();

    res.json({
      success: true,
      message: "Resume published",
      data: resume,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get public resume
export const getPublicResume = async (req, res) => {
  try {
    const { slug } = req.params;

    const resume = await Resume.findOne({
      publicSlug: slug,
      isPublic: true,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      message: "Resume found",
      data: resume,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// make resume private
export const makePrivate = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    resume.isPublic = false;
    resume.publicSlug = null;

    await resume.save();

    res.json({
      success: true,
      message: "Resume is private now",
      data: resume,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};