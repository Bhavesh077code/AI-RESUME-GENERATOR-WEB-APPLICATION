import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";

export const loadTemplate = async (category, htmlFile) => {
  if (!category || !htmlFile) {
    throw new Error("Template category and htmlFile are required");
  }

  const safeCategory = String(category).trim().toLowerCase();
  let safeHtmlFile = String(htmlFile).trim();

  // DB should store "professional1", but also accept "professional1.js".
  if (safeHtmlFile.toLowerCase().endsWith(".js")) {
    safeHtmlFile = safeHtmlFile.slice(0, -3);
  }

  const filePath = path.resolve(
    process.cwd(),
    "templates",
    "resumeAllTemplates",
    safeCategory,
    `${safeHtmlFile}.js`,
  );



  if (!fs.existsSync(filePath)) {
    throw new Error(`Template file not found: ${filePath}`);
  }

  return import(pathToFileURL(filePath).href);
};
