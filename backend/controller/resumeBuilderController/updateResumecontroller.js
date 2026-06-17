

import { Resume } from "../../module/resumeallmodule/resumeModel.js"
import { Template } from "../../module/resumeAllModule/templateModel.js"

export const updateResume = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params

    const { title, content, templateSlug } = req.body

    // 1. Find Resume
    const resume = await Resume.findOne({
      _id: id,
      userId
    })

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      })
    }

    // 2. If template changed → validate
    if (templateSlug) {
      const template = await Template.findOne({
        slug: templateSlug,
        isActive: true
      })

      if (!template) {
        return res.status(400).json({
          message: "Invalid template"
        })
      }

      resume.templateSlug = templateSlug
    }

    // 3. Update fields
    if (title) resume.title = title

    if (content) {
      resume.content = {
        ...resume.content,
        ...content
      }
    }

    await resume.save()

    res.json({
      success: true,
      message: "Resume updated successfully",
      resume
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Error updating resume"
    })
  }
}

