// This controller is used to retrieve a specific resume from the database using its unique resume ID.
//  The Resume model is imported so that the controller can access resume data stored in MongoDB. When the API is called, the resume ID is taken from req.params.id and passed to Resume.findById() to search for the matching resume.
//  If no resume is found with that ID, the controller returns a 404 Not Found response with a message indicating that the resume does not exist.
//  If the resume is found successfully, the controller returns a success response containing the complete resume data so that the frontend can display or use the selected resume.
//  If any error occurs while searching for the resume, the catch block handles the error and returns a 500 Internal Server Error response with the actual error message. The main purpose of this API is to allow the application to retrieve and display the details of one particular resume, for example when a user wants to open, view, edit, preview, or manage a specific resume from their resume list.


import { Resume } from "../../module/resumeAllModule/resumeModel.js"

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};