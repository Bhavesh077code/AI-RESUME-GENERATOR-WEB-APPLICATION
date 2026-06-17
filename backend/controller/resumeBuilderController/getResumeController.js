/*
import { Resume } from '../../module/resumeallmodule/resumeModel.js';

export const getResume = async (req, res) => {
        try {
            const resumes = await Resume.find();

            if (!resumes) {
                return res.status(404).json({ message: 'No resumes found' });
            }
            
            res.status(200).json({
                success: true,
                message: 'Resumes fetched successfully',
                resumes
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching resumes' });
        }
    };
    */


  
import { Resume } from "../../module/resumeallmodule/resumeModel.js"
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