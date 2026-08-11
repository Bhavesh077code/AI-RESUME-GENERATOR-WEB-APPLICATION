
// This controller is used to generate a professional summary for a user's resume with the help of AI.
//  First, the Resume model is imported to access resume data from the database, and the generateResponse function is imported from the AI service to generate the summary.
//  The controller gets the resumeId from the URL parameters and the logged-in user's userId from the authenticated request.
//  It then searches the database for the resume using both resumeId and userId to make sure that the resume exists and belongs to the currently logged-in user.
//  If the resume is not found, a 404 response is returned with an appropriate error message.
//  If the resume is found, its content is sent to the AI service, which analyzes the resume information and generates a professional summary.
//  The generated summary is then returned to the frontend with a successful response. If any error occurs during the database operation, AI generation, or any other part of the process, the catch block handles the error and returns a 500 server error response.
//  The main purpose of this API is to automatically create a professional, job-ready resume summary using the user's existing resume content, saving the user from having to write the summary manually.


import { Resume } from "../../module/resumeAllModule/resumeModel.js"
import { generateResponse } from "../../service/resumeAiService/aiservice.js"

export const generateProfessionalSummary = async (req, res) => {
  try {
    const { resumeId } = req.params
    const userId = req.user.id

    const resume = await Resume.findOne({
      _id: resumeId,
      userId
    })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      })
    }

    const summary = await generateResponse(resume.content)

    return res.json({
      success: true,
      message: "Summary generated successfully",
      summary
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "AI generation failed" || error.message
    })
  }
}