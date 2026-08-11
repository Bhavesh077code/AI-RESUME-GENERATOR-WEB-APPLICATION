
import express from 'express';
import { submitFeedback, getResumeFeedback, getMyFeedback, deleteFeedback, getAllFeedback } from '../../controller/authController/feedBackController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';



const router = express.Router();


// ============================================================
// FEEDBACK ROUTES
// ============================================================

// POST - Submit feedback
router.post("/submit", authMiddleware, submitFeedback);

// GET - Get feedback for a resume
router.get("/resume/:resumeId", authMiddleware, getResumeFeedback);

// GET - Get user's feedback
router.get("/my-feedback", authMiddleware, getMyFeedback);

// DELETE - Delete feedback
router.delete("/:id", authMiddleware, deleteFeedback);


router.get("/all", authMiddleware, getAllFeedback);

export default router;


