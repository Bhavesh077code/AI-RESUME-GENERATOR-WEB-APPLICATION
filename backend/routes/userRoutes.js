
import express from 'express';
import { registerUser } from '../controller/authController/userRegisterController.js.js';
import { loginUser } from '../controller/authController/userLoginController.js';
import { loginLimiter } from '../middleware/ratelimit.js';
import { logoutUser } from '../controller/authController/userLogoutController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { deleteAccount, getProfile, getStats, postupdateProfile, changePassword, updateSettings } from '../controller/authController/userProfileController.js';
import upload from "../middleware/upload.js";



const router = express.Router();


router.post('/register',  registerUser);
router.post('/login', loginLimiter, loginUser);
router.post('/logout', logoutUser);




// GET user profile
router.get("/profile", authMiddleware, getProfile);

// UPDATE user profile
router.put("/update", authMiddleware, upload.single("image"),  postupdateProfile);

// GET user stats
router.get("/stats", authMiddleware,  getStats);

// CHANGE password
router.put("/change-password", authMiddleware , changePassword);

// UPDATE settings
router.put("/settings", authMiddleware, updateSettings);

// DELETE account
router.delete("/delete", authMiddleware, deleteAccount);



export default router;