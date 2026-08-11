
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";

import {
  createTemplate,
  getTemplates,
} from "../../controller/resumeBuilderController/templatecontroller.js";

import { generateResumePreview } from "../../controller/resumeBuilderController/resumePreviewController.js";

const router = express.Router();

router.post("/template", authMiddleware, createTemplate);

router.get("/templates", getTemplates);

router.post("/preview", generateResumePreview);

export default router;
