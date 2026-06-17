/*
import { Resume } from "../../module/resumeallmodule/resumeModel.js"; 
import { generateResponse } from "../../service/resumeAiService/aiService.js";
//import { generateResponse} from "../../service/aiService.js";

export const generateProfessionalSummary = async (req, res) => {
  try {
    const { resumeId } = req.params;
    // find resume
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // AI generate
    const summary = await generateResponse(
        resume.content
      );


    return res.status(200).json({
      success: true,
      message: "Summary generated successfully",
      summary,
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate summary",
    });
  }
};

*/


import { Resume } from "../../module/resumeallmodule/resumeModel.js"
import { generateResponse } from "../../service/resumeAiService/aiService.js"

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