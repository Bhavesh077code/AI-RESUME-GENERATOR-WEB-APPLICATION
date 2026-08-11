
// This controller is used to create and register a new resume template in the application.
//  It first receives the template name, slug, HTML file name, category, and optional thumbnail from the request body.
//  The controller validates the required fields and returns a 400 Bad Request response if the name, slug, or HTML file name is missing.
//  The slug is then converted to lowercase to maintain a consistent and URL-friendly format.
//  Before creating the template, the controller checks whether the same slug already exists in the database; if it exists, a unique number is added to the slug so that multiple templates can have similar names without causing duplicate slug conflicts.
//  It also checks whether a template with the same name already exists and rejects the request if a duplicate name is found.
//  After validation, the controller creates the expected file path using the project's current working directory, the templates folder, the resumeAllTemplates folder, the selected category, and the provided HTML file name.
//  It then uses the file system module to check whether the actual template JavaScript file exists at that location.
//  This step is important because the template should not be added to the database if its corresponding template file is missing.
//  Once all validations are successful, the template information is stored in the database using the Template model, including its name, unique slug, HTML file, category, and optional thumbnail.
//  Finally, the newly created template is returned to the frontend with a 201 Created response. If any unexpected error occurs during validation, database operations, or file checking, the catch block handles the error and returns a 500 Internal Server Error response.
//  Overall, this controller helps the application safely add new resume templates by validating their information, preventing duplicate names and slugs, verifying that the actual template file exists, and then registering the template in the database so it can be used for resume creation and preview.

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
      message: error.message || "Something went wrong"
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