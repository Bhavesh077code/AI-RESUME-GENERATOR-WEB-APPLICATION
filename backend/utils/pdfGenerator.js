import puppeteer from "puppeteer";
import cloudinary from "../config/cloudinary.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForImages = async (page, timeout = 10000) => {
  await page.evaluate(() => {
    for (const img of document.images) img.loading = "eager";
  });

  await Promise.race([
    page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise((resolve) => {
            const done = () => resolve();
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          });
        }),
      );
    }),
    sleep(timeout),
  ]);
};

const uploadPDF = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "resume",
        resource_type: "raw",
        public_id: `resume-${Date.now()}`,
        format: "pdf",
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    uploadStream.on("error", reject);
    uploadStream.end(buffer);
  });

export const generatePDF = async (html) => {
  let browser;

  try {
    if (!html || typeof html !== "string" || !html.trim()) {
      throw new Error("Generated resume HTML is empty");
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error(
        "Cloudinary environment variables are missing. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
      );
    }

    const executablePath = puppeteer.executablePath();
    

    browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-networking",
        "--disable-features=Translate,BackForwardCache",
      ],
      timeout: 60000,
    });

    const page = await browser.newPage();

    page.on("pageerror", (error) => {
      
    });

    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 1,
    });

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });

    await waitForImages(page, 10000);
    await sleep(300);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    if (!pdfBuffer?.length) {
      throw new Error("Puppeteer returned an empty PDF");
    }

    

    await browser.close();
    browser = null;

    const result = await uploadPDF(pdfBuffer);

    if (!result?.secure_url) {
      throw new Error("Cloudinary did not return a PDF URL");
    }

    
    return result.secure_url;
  } catch (error) {
  

    throw new Error(`PDF generation failed: ${error.message}`);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        
      }
    }
  }
};
