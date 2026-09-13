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
    origin: (origin, callback) => {
      // Allow server-to-server tools/curl and configured frontend.
      if (!origin) return callback(null, true);

      const allowed = process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(",").map((url) => url.trim()).filter(Boolean)
        : [];

      const isVercel = /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i.test(origin);

      if (isVercel || allowed.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS: origin not allowed"));
    },
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





/*
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

*/