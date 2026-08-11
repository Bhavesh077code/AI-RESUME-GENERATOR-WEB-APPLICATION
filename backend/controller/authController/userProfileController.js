
import { User } from "../../module/authModule/userModel.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { Resume } from "../../module/resumeAllModule/resumeModel.js";

// ============================================================
// 1. GET USER PROFILE
// ============================================================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ============================================================
// 2. UPDATE USER PROFILE
// ============================================================
export const postupdateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      bio,
      title,
      company,
      website,
      github,
      linkedin,
      twitter,
    } = req.body;
    const userId = req.user.id;

    // Check if email already exists for another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already in use" });
      }
    }

    // Build update object
    const updateData = {
      name,
      email,
      phone,
      location,
      bio,
      title,
      company,
      website,
      github,
      linkedin,
      twitter,
    };

    // Handle profile image upload
    if (req.file) {
      // Delete old image if exists
      const user = await User.findById(userId);
      if (user.profileImage) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads",
          path.basename(user.profileImage),
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ============================================================
// 3. GET USER STATS
// ============================================================
export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total resumes
    const resumes = await Resume.find({ userId });
    const totalResumes = resumes.length;

    // Get total downloads (sum of download counts from all resumes)
    let totalDownloads = 0;
    let totalViews = 0;
    resumes.forEach((resume) => {
      totalDownloads += resume.downloads || 0;
      totalViews += resume.views || 0;
    });

    // Get total templates used (unique templates)
    const uniqueTemplates = new Set(resumes.map((r) => r.templateSlug));

    res.json({
      success: true,
      stats: {
        resumes: totalResumes,
        downloads: totalDownloads,
        views: totalViews,
        templates: uniqueTemplates.size,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ============================================================
// 4. CHANGE PASSWORD
// ============================================================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Get user with password
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ============================================================
// 5. UPDATE SETTINGS
// ============================================================
export const updateSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { theme, notifications, privacy, twoFactor } = req.body;

    const updateData = {};
    if (theme !== undefined) updateData.theme = theme;
    if (notifications !== undefined) updateData.notifications = notifications;
    if (privacy !== undefined) updateData.privacy = privacy;
    if (twoFactor !== undefined) updateData.twoFactor = twoFactor;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.json({ success: true, message: "Settings updated", user });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ============================================================
// 6. DELETE ACCOUNT
// ============================================================
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete all user's resumes
    await Resume.deleteMany({ userId });

    // Delete profile image if exists
    const user = await User.findById(userId);
    if (user.profileImage) {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(user.profileImage),
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
