

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