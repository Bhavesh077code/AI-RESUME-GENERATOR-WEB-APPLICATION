
import cloudinary from "cloudinary"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import "dotenv/config"

// 🔥 Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// 🔥 Storage setup
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    return {
      folder: "resume",
      resource_type: "auto",
      allowed_formats: ["jpg", "jpeg", "png", "pdf"],
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
    }
  },
})

// 🔥 Multer config
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB (comment fix)
  },
})