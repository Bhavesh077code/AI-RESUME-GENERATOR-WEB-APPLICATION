/*
import { Template } from "../../module/resumeAllModule/templateModel.js";

export const createTemplate = async (req, res) => {
  try {
    const { name, slug, htmlFile, category, thumbnail } = req.body;

    // 1. Basic validation
    if (!name || !slug || !htmlFile) {
      return res.status(400).json({
        message: 'Name, slug and htmlFile are required',
      });
    }


    const slugExists = await Template.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({
        message: 'Slug already exists',
      });
    }

    if (slug.includes(' ')) {
      return res.status(400).json({
        message: 'Slug must not contain spaces',
      });
    }

    if (slug !== slug.toLowerCase()) {
      return res.status(400).json({
        message: 'Slug must be lowercase',
      });
    }

    // 2. Create template
    const template = await Template.create({
      name,
      slug,
      htmlFile,
      category: category || 'simple', // default fallback

    });

    res.status(201).json({
      success: true,
      message: 'Template created successfully',
      template,
    });

  } catch (error) {
    console.error('Template Error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

*/
/*
import { loadTemplate } from "../../utils/templateLoader.js"
import { Template } from "../../module/resumeAllModule/templateModel.js"
import fs from "fs"
import path from "path"

export const createTemplate = async (req, res) => {
  try {
    const { name, slug, htmlFile, category, thumbnail } = req.body

    // 1. Validation
    if (!name || !htmlFile) {
      return res.status(400).json({
        success: false,
        message: "Name and htmlFile are required",
      })
    }

    // 2. Auto slug generate
    if (slug !== slug.toLowerCase()) {
      return res.status(400).json({
        message: 'Slug must be lowercase',
      });
    }

    // 3. Slug uniqueness fix (important 🔥)
    let existingSlug = await Template.findOne({ slug })

    if (existingSlug) {
      const count = await Template.countDocuments({
        slug: new RegExp(`^${slug}`)
      })
      slug = `${slug}-${count + 1}`
    }

    // 4. Name duplicate check (IMPORTANT)
    const nameExists = await Template.findOne({ name })
    if (nameExists) {
      return res.status(400).json({
        success: false,
        message: "Template name already exists",
      })
    }

    // 5. Check template file exists
    const filePath = path.resolve(
      `../templates/resumeAllTemplates/${category || "simple"}/${htmlFile}.js`
    )

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({
        success: false,
        message: "Template file not found in templates folder",
      })
    }

    // 6. Create template
    const template = await Template.create({
      name,
      slug,
      htmlFile,
      category: category || "simple",
      thumbnail: thumbnail || null,
    })

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      template,
    })

  } catch (error) {
    console.error("Template Error:", error)

    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
*/

import { Template } from "../../module/resumeAllModule/templateModel.js"
import fs from "fs"
import path from "path"

export const createTemplate = async (req, res) => {
  try {
    let { name, slug, htmlFile, category, thumbnail } = req.body

    // 1. VALIDATION
    if (!name || !slug || !htmlFile) {
      return res.status(400).json({
        success: false,
        message: "Name, slug and htmlFile required",
      })
    }

    // 2. lowercase slug
    slug = slug.toLowerCase()

    // 3. duplicate slug fix 🔥
    const existing = await Template.findOne({ slug })

    if (existing) {
      const count = await Template.countDocuments({
        slug: new RegExp(`^${slug}`)
      })

      slug = `${slug}-${count + 1}`
    }

    // 4. duplicate name check
    const nameExists = await Template.findOne({ name })

    if (nameExists) {
      return res.status(400).json({
        success: false,
        message: "Template name already exists",
      })
    }

    // 5. FIXED FILE PATH 🔥
    const filePath = path.join(
      process.cwd(),
      "templates",
      "resumeAllTemplates",
      category || "simple",
      `${htmlFile}.js`
    )

    // 6. CHECK FILE EXISTS
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({
        success: false,
        message: "Template file not found",
      })
    }

    // 7. SAVE IN DB
    const template = await Template.create({
      name,
      slug,
      htmlFile,
      category: category || "simple",
      thumbnail: thumbnail || null,
    })

    return res.status(201).json({
      success: true,
      message: "Template created successfully",
      template,
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}




/*

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
    res.status(200).json({
      success: true,
      message: "Templates fetched successfully",
      templates,
      user: {
        id: req.user.id,
        name: req.user.name
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching templates",
    })
  }
}
  */

export const getTemplates = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    const templates = await Template.find(filter);

    res.json({
      success: true,
      templates,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};