import puppeteer from "puppeteer";
import cloudinary from "../config/cloudinary.js";

export const generatePDF = async (html) => {
  let browser;

  try {
    console.log("🔄 Starting PDF generation with Puppeteer...");

    // ✅ Chrome ka path automatically dhundho - executablePath MAT do
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
      ],
      timeout: 60000,
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1,
    });

    console.log("📄 Setting HTML content...");
    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Fonts ke liye wait
    await page.evaluateHandle("document.fonts.ready");

    // Images ke liye wait
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              }),
          ),
      );
    });

    console.log("📄 Generating PDF...");
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
      timeout: 30000,
    });

    console.log(`✅ PDF generated (${pdfBuffer.length} bytes)`);

    await browser.close();
    browser = null;

    // Cloudinary Upload
    console.log("📤 Uploading to Cloudinary...");
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resume",
          resource_type: "auto",
          public_id: `resume-${Date.now()}`,
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("✅ Cloudinary upload success");
            resolve(result);
          }
        },
      );

      uploadStream.end(pdfBuffer);
    });

    console.log("✅ PDF uploaded:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error("Error closing browser:", e);
      }
    }

    console.error("❌ PDF GENERATION ERROR:", error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

/*
import puppeteer from "puppeteer";
import cloudinary from "../config/cloudinary.js";

export const generatePDF = async (html) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    await page.evaluateHandle("document.fonts.ready");

    
    // Check height
    const isTooLong = await page.evaluate(() => {
      const body = document.body;
      const height = body.scrollHeight;

      const A4_HEIGHT = 1190 + 922;

      return height > A4_HEIGHT;
    });

    
    if (isTooLong) {
      throw new Error("RESUME_TOO_LONG");
    }
    

    // Generate PDF in memory
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    browser = null;

    // Upload PDF directly to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resume",
          resource_type: "image",
          public_id: `resume-${Date.now()}`,
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(pdfBuffer);
    });

    console.log(
      "PDF uploaded to Cloudinary:",
      result.secure_url
    );

    return result.secure_url;

  } catch (error) {
    if (browser) {
      await browser.close();
    }

    console.log(
      "PDF GENERATION ERROR:",
      error.message
    );

    if (error.message === "RESUME_TOO_LONG") {
      throw new Error(
        "Resume exceeds one A4 page. Please reduce content."
      );
    }

    throw error;
  }
};

*/

/*
import puppeteer from "puppeteer";
import cloudinary from "../config/cloudinary.js";

export const generatePDF = async (html) => {
  let browser = null;

  try {
    console.log("Starting PDF generation...");

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });

    const page = await browser.newPage();

    // A4 size at 96 DPI
    const A4_WIDTH = 794;
    const A4_HEIGHT = 1123;

    await page.setViewport({
      width: A4_WIDTH,
      height: A4_HEIGHT,
      deviceScaleFactor: 1,
    });

    console.log("Setting HTML...");

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Wait for fonts
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
    });

    // Wait for images
    await page.evaluate(async () => {
      const images = Array.from(document.images);

      await Promise.all(
        images.map((img) => {
          if (img.complete) {
            return Promise.resolve();
          }

          return new Promise((resolve) => {
            img.addEventListener("load", resolve, {
              once: true,
            });

            img.addEventListener("error", resolve, {
              once: true,
            });
          });
        })
      );
    });

    // Get page dimensions
    const getDimensions = async () => {
      return await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;

        return {
          bodyScrollHeight: body.scrollHeight,
          bodyOffsetHeight: body.offsetHeight,
          htmlScrollHeight: html.scrollHeight,
          htmlOffsetHeight: html.offsetHeight,
          clientHeight: html.clientHeight,
        };
      });
    };

    let dimensions = await getDimensions();

    console.log("PAGE DIMENSIONS:", dimensions);

    let contentHeight = Math.max(
      dimensions.bodyScrollHeight,
      dimensions.bodyOffsetHeight,
      dimensions.htmlScrollHeight,
      dimensions.htmlOffsetHeight
    );

    console.log("Content height:", contentHeight);
    console.log("Allowed A4 height:", A4_HEIGHT);

    // --------------------------------------------------
    // AUTO SCALE IF CONTENT IS SLIGHTLY TOO LONG
    // --------------------------------------------------

    if (contentHeight > A4_HEIGHT) {
      const scale = A4_HEIGHT / contentHeight;

      console.log(
        `Resume is too long. Applying scale: ${scale}`
      );

      await page.evaluate((scale) => {
        document.body.style.zoom = scale;

        // Prevent horizontal overflow after zoom
        document.body.style.width = `${100 / scale}%`;
      }, scale);

      // Recalculate dimensions
      dimensions = await getDimensions();

      console.log(
        "PAGE DIMENSIONS AFTER SCALING:",
        dimensions
      );

      contentHeight = Math.max(
        dimensions.bodyScrollHeight,
        dimensions.bodyOffsetHeight,
        dimensions.htmlScrollHeight,
        dimensions.htmlOffsetHeight
      );

      console.log(
        "Content height after scaling:",
        contentHeight
      );
    }

    // --------------------------------------------------
    // FINAL SAFETY CHECK
    // --------------------------------------------------

    if (contentHeight > A4_HEIGHT) {
      console.log("Resume is still too long!");

      throw new Error("RESUME_TOO_LONG");
    }

    console.log("Resume fits A4 page.");
    console.log("Generating PDF...");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
      pageRanges: "1",
    });

    console.log(
      "PDF generated:",
      pdfBuffer.length,
      "bytes"
    );

    await browser.close();
    browser = null;

    console.log("Uploading PDF to Cloudinary...");

    const result = await new Promise((resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder: "resume",
            resource_type: "image",
            public_id: `resume-${Date.now()}`,
            format: "pdf",
          },
          (error, result) => {
            if (error) {
              console.error(
                "Cloudinary upload error:",
                error
              );

              reject(error);
              return;
            }

            resolve(result);
          }
        );

      uploadStream.on("error", reject);

      uploadStream.end(pdfBuffer);
    });

    console.log(
      "PDF uploaded successfully:",
      result.secure_url
    );

    return result.secure_url;
  } catch (error) {
    if (browser) {
      await browser.close();
      browser = null;
    }

    console.error(
      "PDF GENERATION ERROR:",
      error
    );

    if (error.message === "RESUME_TOO_LONG") {
      throw new Error(
        "Resume content is too long to fit on one A4 page."
      );
    }

    throw error;
  }
};

*/

/*
// utils/pdfGenerator.js
import pdf from 'html-pdf';
import cloudinary from "../config/cloudinary.js";

export const generatePDF = (html) => {
  return new Promise((resolve, reject) => {
    console.log('📄 Generating PDF with html-pdf...');

    // Clean HTML - Remove scripts and unsafe content
    const cleanHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '');

    // PDF Options - Optimized for Render
    const options = {
      format: 'A4',
      border: {
        top: '15px',
        bottom: '15px',
        left: '15px',
        right: '15px'
      },
      quality: '100',
      timeout: 60000,
      phantomArgs: ['--local-to-remote-url-access=yes'],
      childProcessOptions: {
        env: {
          OPENSSL_CONF: '/dev/null',
        }
      }
    };

    // Generate PDF
    pdf.create(cleanHtml, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('❌ PDF generation error:', err);
        reject(new Error(`PDF generation failed: ${err.message}`));
        return;
      }

      console.log(`✅ PDF generated (${buffer.length} bytes)`);
      console.log('📤 Uploading to Cloudinary...');

      // Upload to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resume",
          resource_type: "auto",
          public_id: `resume-${Date.now()}`,
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else {
            console.log('✅ PDF uploaded:', result.secure_url);
            resolve(result.secure_url);
          }
        }
      );

      uploadStream.end(buffer);
    });
  });
};



*/

/*
// utils/pdfGenerator.js
import pdf from 'html-pdf';
import cloudinary from "../config/cloudinary.js";
import { Readable } from 'stream';

export const generatePDF = (html) => {
  return new Promise((resolve, reject) => {
    const options = {
      format: 'A4',
      border: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      },
      quality: '100',
      timeout: 60000
    };

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('PDF generation error:', err);
        reject(err);
        return;
      }

      // Upload to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resume",
          resource_type: "auto",
          public_id: `resume-${Date.now()}`,
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            console.log("PDF uploaded to Cloudinary:", result.secure_url);
            resolve(result.secure_url);
          }
        }
      );

      // Create a readable stream from buffer and pipe to Cloudinary
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  });
};

*/
