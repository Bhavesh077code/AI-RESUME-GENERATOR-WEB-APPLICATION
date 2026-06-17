/*
import { Resume } from "../../module/resumeAllModule/resumeModel.js";


export const deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        await resume.remove();

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting resume' });
    }
}

*/

import { Resume } from "../../module/resumeallmodule/resumeModel.js"

export const deleteResume = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params

    const resume = await Resume.findOneAndDelete({
      _id: id,
      userId
    })

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      })
    }

    res.json({
      success: true,
      message: "Resume deleted successfully"
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Error deleting resume"
    })
  }
}