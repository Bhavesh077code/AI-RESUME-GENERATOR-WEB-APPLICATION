
/*
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const loadTemplate = async (category, htmlFile) => {
  try {
    const filePath = path.join(
      __dirname,
      `../templates/resumeAllTemplates/${category}/${htmlFile}.js`
    )

    const module = await import(filePath)

    return module
  } catch (error) {
    console.error("Template load error:", error)
    throw new Error("Template not found")
  }
}

*/


/*
import path from "path"
import { pathToFileURL } from "url"

export const loadTemplate = async (category, htmlFile) => {
  try {
    const filePath = path.join(
      process.cwd(),// Use current working directory for better compatibility
      "templates",
      "resumeAllTemplates",
      category,
      `${htmlFile}.js`
    )
    console.log("FILE PATH:", filePath);

    // 🔥 CONVERT TO FILE URL (IMPORTANT)
    const fileUrl = pathToFileURL(filePath).href
    console.log("FILE URL:", fileUrl);

    const module = await import(fileUrl)

    return module

  } catch (error) {
    console.error("Template load error:", error)
    throw new Error("Template not found")
  }
}
  */


/*
import path from "path";
import { pathToFileURL } from "url";
import fs from "fs";

export const loadTemplate = async (category, htmlFile) => {
  try {
    const filePath = path.resolve(
      process.cwd(),
      "templates",
      "resumeAllTemplates",
      category,
      `${htmlFile}.js`
    );

    // 1. Pehle hi check karlo file computer mein hai bhi ya nahi
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File physically does not exist at: ${filePath}`);
      throw new Error(`File not found on disk`);
    }

    // 2. Windows compatible File URL banana
    const fileUrl = pathToFileURL(filePath).toString(); // .href ki jagah .toString() behtar kaam karta hai

    console.log("🔍 Attemping dynamic import from URL:", fileUrl);

    const module = await import(fileUrl);
    return module;

  } catch (error) {
    console.error("❌ Actual Template Load Error Detail:", error);
    throw new Error("Template not found");
  }
};

*/


/*
import path from "path";
import { pathToFileURL } from "url";
import fs from "fs";

export const loadTemplate = async (category, htmlFile) => {
  try {

    if (
      !category ||
      category === "undefined" ||
      category === "null"
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid category is required",
      });
    }

    if (
      !htmlFile ||
      htmlFile === "undefined" ||
      htmlFile === "null"
    ) {
      throw new Error(
        `Invalid htmlFile received: ${htmlFile}`
      );
    }

    console.log("Category:", category);
    console.log("Template:", htmlFile);

    const filePath = path.resolve(
      process.cwd(),
      "templates",
      "resumeAllTemplates",
      category,
      `${htmlFile}.js`
    );

    console.log("Category:", category);
    console.log("Template:", htmlFile);
    console.log("Path:", filePath);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Template file not found: ${filePath}`);
    }

    const fileUrl = pathToFileURL(filePath).href;

    const module = await import(fileUrl);

    return module;
  } catch (error) {
    console.error("Template Load Error:", error);
    throw error;
  }
};

*/

/*
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

export const loadTemplate = async (category, slug) => {
  const filePath = path.resolve(
    process.cwd(),
    "templates",
    "resumeAllTemplates",
    category,
    `${slug}.js`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Template file not found: ${filePath}`);
  }

  const fileUrl = pathToFileURL(filePath).href;

  const module = await import(fileUrl);

  return module;
};

*/


import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";

export const loadTemplate = async (category, htmlFile) => {
    try {
        if (!category || !htmlFile) {
            throw new Error("Invalid category or htmlFile");
        }

        const filePath = path.resolve(
            process.cwd(),
            "templates",
            "resumeAllTemplates",
            category,
            `${htmlFile}.js`
        );

        console.log("Template Path:", filePath);

        if (!fs.existsSync(filePath)) {
            throw new Error(`Template file not found: ${filePath}`);
        }

        const fileUrl = pathToFileURL(filePath).href;

        const module = await import(fileUrl);

        return module;

    } catch (error) {
        console.error("Template Load Error:", error.message);
        throw error;
    }
};