// This controller is used to fetch all resumes belonging to the currently logged-in user.
//  First, the Resume model is imported to access resume data from the database, while mongoose is imported for MongoDB-related operations.
//  The controller gets the authenticated user's ID from req.user.id and uses it to search the Resume collection, ensuring that only resumes created by the logged-in user are retrieved.
//  The find() method returns all matching resumes, and sort({ createdAt: -1 }) sorts them by creation date in descending order so that the newest resume appears first.
//  After successfully retrieving the resumes, the controller returns a 200 success response containing a success status, the total number of resumes using resumes.
// length, and the complete resumes data. If any error occurs while fetching the resumes from the database, the catch block handles the error and returns a 500 server error response with an appropriate error message.
//  The main purpose of this API is to provide the logged-in user with a list of all their saved resumes, with the most recently created resume displayed first, so the frontend can show and manage the user's resume collection.



import { Resume } from "../../module/resumeAllModule/resumeModel.js"
import mongoose from "mongoose"

 export const getUserResumes = async (req, res) => {
  try {

    const userId = req.user.id

    const resumes = await Resume.find({ userId })
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching resumes"
    })
  }
}