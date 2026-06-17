/*
import { Resume } from '../../module/resumeallmodule/resumeModel.js';

export const downloadPdf = async (req, res) => {
    try {
        const resumes = await Resume.find();
        const pdf = await generatePDF(resumes);
        res.setHeader({
            "Content-Type":
                "application/pdf",

            "Content-Disposition":
                "attachment; filename=resume.pdf",
        });
        res.send(pdf);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
}

*/


import { Resume } from "../../module/resumeallmodule/resumeModel.js"
import { Template } from "../../module/resumeAllModule/templateModel.js"
import { generatePDF } from "../../utils/pdfGenerator.js"

import { loadTemplate } from "../../utils/templateLoader.js"


export const downloadResumePDF = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params

    // 1. Resume find
    const resume = await Resume.findOne({
      _id: id,
      userId
    })

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      })
    }

    // 2. Template find
    const template = await Template.findOne({
      slug: resume.templateSlug,
      isActive: true
    })

    if (!template) {
      return res.status(404).json({
        message: "Template not found"
      })
    }

    // 3. Load template
    const module = await loadTemplate(
      template.category,
      template.htmlFile
    )

    // 4. Generate HTML
    const html =
      module[template.htmlFile](resume.content)

    // 5. Generate PDF
    const pdfBuffer = await generatePDF(html)

    // 6. Send as download
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf"
    })

    res.send(pdfBuffer)

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Error downloading resume"
    })
  }
}