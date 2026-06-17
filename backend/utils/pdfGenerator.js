/*
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export const generatePDF = async (html) => {
  try {
    const uploadDir = path.resolve("uploads");

    // create uploads folder
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `resume-${Date.now()}.pdf`;

    const localFilePath = path.join(uploadDir, fileName);

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    await page.evaluateHandle("document.fonts.ready");

    await page.pdf({
      path: localFilePath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // ✅ PUBLIC URL
    const publicUrl = `http://localhost:5000/uploads/${fileName}`;

    return publicUrl;

  } catch (error) {
    console.log("PDF GENERATION ERROR:", error);
    throw error;
  }
};

*/


import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export const generatePDF = async (html) => {
  try {
    const uploadDir = path.resolve("uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `resume-${Date.now()}.pdf`;
    const localFilePath = path.join(uploadDir, fileName);

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    await page.evaluateHandle("document.fonts.ready");

    // 🔥 STEP 1: CHECK HEIGHT BEFORE PDF
    const isTooLong = await page.evaluate(() => {
      const body = document.body;
      const height = body.scrollHeight;

      const A4_HEIGHT = 1190 + 922; // px approx

      return height > A4_HEIGHT;
    });

    // ❌ BLOCK IF OVERFLOW
    if (isTooLong) {
      await browser.close();
      throw new Error("RESUME_TOO_LONG");
    }

    // ✅ STEP 2: GENERATE PDF ONLY IF OK
    await page.pdf({
      path: localFilePath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    const publicUrl = `http://localhost:5000/uploads/${fileName}`;

    return publicUrl;

  } catch (error) {
    console.log("PDF GENERATION ERROR:", error.message);

    // 🔥 send clean error
    if (error.message === "RESUME_TOO_LONG") {
      throw new Error("Resume exceeds one A4 page. Please reduce content.");
    }

    throw error;
  }
};