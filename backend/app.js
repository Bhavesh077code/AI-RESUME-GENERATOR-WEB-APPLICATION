import express from "express";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeAllRoutes/resumeRoutes.js";
import templateRoutes from "./routes/resumeAllRoutes/templateRoutes.js";
import feedBackRoutes from "./routes/resumeAllRoutes/feedBackRoutes.js";

const app = express();

// =======================
// Middleware
// =======================
app.use(
  cors({
    origin: [/\.vercel\.app$/],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Static Files
// =======================
app.use("/uploads", express.static(path.resolve("uploads")));

// =======================
// Routes
// =======================
app.use("/user", userRoutes);
app.use("/resume", resumeRoutes);
app.use("/create", templateRoutes);
app.use("/feedback", feedBackRoutes);

// =======================
// Health Check
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Resume API is running 🚀",
  });
});

// =======================
// 404 Handler
// =======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =======================
// Global Error Handler
// =======================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
