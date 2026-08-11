
import express from "express";

import upload from "../../middleware/upload.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";


import { createResume } from "../../controller/resumeBuilderController/resumecontroller.js";
import { getUserResumes } from "../../controller/resumeBuilderController/getResumeController.js";
import { generateProfessionalSummary } from "../../controller/resumeBuilderController/aiSummaryController.js";
import { updateResume } from "../../controller/resumeBuilderController/updateResumecontroller.js";
import { getResumeById } from "../../controller/resumeBuilderController/getResumeIdController.js";




const router = express.Router();

// Create resume
router.post("/create", authMiddleware, upload.single("image"), createResume);

// Get user's resumes
router.get(
  "/user/:id",
  authMiddleware,
  getUserResumes
);

// AI summary
router.get(
  "/summary/:resumeId",
  authMiddleware,
  generateProfessionalSummary
);



// Update resume
router.put("/update/:id",
  authMiddleware,
  upload.single("image"),
  updateResume
);


// Get resume
router.get(
  "/resume/:id",
  authMiddleware,
  getResumeById
);

export default router;
