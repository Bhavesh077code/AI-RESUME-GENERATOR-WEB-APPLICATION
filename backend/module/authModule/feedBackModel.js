import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      maxlength: 500,
      default: "",
    },
    emoji: {
      type: String,
      default: "",
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model("Feedback", FeedbackSchema);