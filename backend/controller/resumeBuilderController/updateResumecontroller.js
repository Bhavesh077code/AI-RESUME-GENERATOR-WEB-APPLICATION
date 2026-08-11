
// This controller is used to update an existing resume that belongs to the currently logged-in user.
//  It first gets the authenticated user's ID from req.user.id and the resume ID from the request parameters, then searches the database using both values to make sure that the requested resume exists and belongs to the current user.
//  The controller receives the updated title, resume content, and template slug from the request body.
//  If the resume is not found, it returns a 404 response and stops the update process.
//  If the user wants to change the resume template, the controller first checks the database to make sure that the selected template exists and is currently active; if the template is invalid, a 400 response is returned.
//  If the template is valid, the resume's templateSlug is updated. The controller then checks whether a new title has been provided and updates the existing title when necessary.
//  For the resume content, it uses the spread operator to merge the new content with the existing content, which allows the user to update specific resume sections without completely replacing all previously saved information.
//  After making the required changes, the updated resume is saved to the database using resume.save(). Finally, the controller returns a success response containing the updated resume so that the frontend can immediately display the latest information.
//  If any unexpected error occurs during the database search, template validation, update, or save operation, the catch block logs the error and returns a 500 server error response. 
// Overall, this API allows users to edit and update their existing resume information, change their selected template, and save the latest changes securely while ensuring that users can only modify their own resumes.


import { Resume } from "../../module/resumeAllModule/resumeModel.js"
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

