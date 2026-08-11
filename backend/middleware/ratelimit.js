import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5, // 5 attempts


  keyGenerator: (req) => {
    const email = req.body.email?.toLowerCase().trim();

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // combine email + ip

    return `${email}:${ip}`;
  },

  handler: (req, res) => {
    const email = req.body.email;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    return res.status(429).json({
      success: false,

      message: `${email} is temporarily blocked. ${ip} Try again after 15 minutes.`,
    });
  },

  standardHeaders: true,

  legacyHeaders: false,

});
