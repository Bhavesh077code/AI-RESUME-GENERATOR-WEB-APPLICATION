
import { Feedback } from "../../module/authModule/feedBackModel.js";
import { User } from "../../module/authModule/userModel.js";
import { Resume } from "../../module/resumeAllModule/resumeModel.js";


// ============================================================
// 1. SUBMIT FEEDBACK
// ============================================================
export const submitFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const { resumeId, rating, feedback, emoji } = req.body;

    // Validate
    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Create feedback
    const feedbackData = new Feedback({
      userId,
      resumeId,
      rating,
      feedback: feedback || "",
      emoji: emoji || "",
    });

    await feedbackData.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: feedbackData,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
      error: error.message,
    });
  }
};

// ============================================================
// 2. GET FEEDBACK FOR A RESUME
// ============================================================
export const getResumeFeedback = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const feedbacks = await Feedback.find({ resumeId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    // Calculate average rating
    const total = feedbacks.length;
    const sum = feedbacks.reduce((acc, f) => acc + f.rating, 0);
    const averageRating = total > 0 ? (sum / total).toFixed(1) : 0;

    res.json({
      success: true,
      feedbacks,
      stats: {
        total,
        averageRating,
      },
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
    });
  }
};

// ============================================================
// 3. GET USER'S FEEDBACK
// ============================================================
export const getMyFeedback = async (req, res) => {
  try {
    const userId = req.user.id;

    const feedbacks = await Feedback.find({ userId })
      .populate("resumeId", "title")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.error("Error fetching user feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
    });
  }
};

// ============================================================
// 4. DELETE FEEDBACK
// ============================================================
export const deleteFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const feedbackId = req.params.id;

    const feedback = await Feedback.findOne({ _id: feedbackId, userId });
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    await Feedback.findByIdAndDelete(feedbackId);

    res.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete feedback",
    });
  }
};


// ============================================================
// GET ALL FEEDBACK WITH PAGINATION, FILTERS & SEARCH
// ============================================================
export const getAllFeedback = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sort = "newest",
      rating = "all",
      search = ""
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build filter query
    const filterQuery = {};
    
    // Rating filter
    if (rating !== "all") {
      filterQuery.rating = parseInt(rating);
    }

    // Search filter (search in feedback text or user name)
    if (search) {
      const users = await User.find({
        name: { $regex: search, $options: "i" }
      }).select("_id");
      const userIds = users.map(u => u._id);
      
      filterQuery.$or = [
        { feedback: { $regex: search, $options: "i" } },
        { userId: { $in: userIds } }
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "highest":
        sortOption = { rating: -1 };
        break;
      case "lowest":
        sortOption = { rating: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Get feedbacks with pagination
    const feedbacks = await Feedback.find(filterQuery)
      .populate("userId", "name email profileImage")
      .populate("resumeId", "title")
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalItems = await Feedback.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalItems / parseInt(limit));

    // Calculate stats from all feedback (not just current page)
    const allFeedbacks = await Feedback.find({});
    const allRatings = allFeedbacks.map(f => f.rating);
    const total = allRatings.length;
    const sum = allRatings.reduce((a, b) => a + b, 0);
    const average = total > 0 ? (sum / total).toFixed(1) : 0;

    const fiveStar = allRatings.filter(r => r === 5).length;
    const fourStar = allRatings.filter(r => r === 4).length;
    const threeStar = allRatings.filter(r => r === 3).length;
    const twoStar = allRatings.filter(r => r === 2).length;
    const oneStar = allRatings.filter(r => r === 1).length;

    res.json({
      success: true,
      feedbacks,
      stats: {
        total,
        average,
        fiveStar,
        fourStar,
        threeStar,
        twoStar,
        oneStar,
      },
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching all feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
    });
  }
};