import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const fileName = file.originalname
      .split(".")
      .slice(0, -1)
      .join(".")
      .replace(/[^a-zA-Z0-9-_]/g, "-");

    return {
      folder: "resume",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `${Date.now()}-${fileName}`,
    };
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    }
  },
});

export default upload;