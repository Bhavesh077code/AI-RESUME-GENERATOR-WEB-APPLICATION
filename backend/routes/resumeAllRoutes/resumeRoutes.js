
import express from 'express';
import { createResume } from '../../controller/resumeBuilderController/resumeController.js';
import { getUserResumes} from '../../controller/resumeBuilderController/getResumeController.js';
import { generateProfessionalSummary } from '../../controller/resumeBuilderController/aiSummaryController.js';
import { upload } from '../../config/multer.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { deleteResume } from '../../controller/resumeBuilderController/deleteResumeController.js';
import { publishResume , makePrivate, getPublicResume } from '../../controller/resumeBuilderController/publicResumeLinkController.js';
import { updateResume } from '../../controller/resumeBuilderController/updateResumecontroller.js';
import { downloadResumePDF } from '../../controller/resumeBuilderController/downloadPdfcontroller.js';
import { getResumeById } from '../../controller/resumeBuilderController/getResumeIdController.js';

const router = express.Router();


router.post('/create', authMiddleware, upload.single("image"), createResume);
router.get('/user/:id', authMiddleware, getUserResumes);
router.get('/summary/:resumeId', authMiddleware, generateProfessionalSummary);
router.delete('/delete/:id', authMiddleware , deleteResume);
router.put('/update/:id', authMiddleware, upload.single("image"), updateResume);
router.get('/download/:id', authMiddleware, downloadResumePDF);
router.get('/resume/:id', authMiddleware, getResumeById);

//Public and Private Resume
router.put('/public/:id', publishResume);
router.get('/public/:slug', getPublicResume);
router.put('/private/:id', makePrivate);

export default router