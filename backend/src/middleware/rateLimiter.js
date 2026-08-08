import rateLimit from "express-rate-limit";

function buildRateLimitResponse(message) {
  return (req, res) => {
    res.status(429).json({
      success: false,
      message,
    });
  };
}

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: buildRateLimitResponse(
    "Too many requests from this IP. Please try again later."
  ),
});

export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: buildRateLimitResponse(
    "Too many login attempts. Please try again after 15 minutes."
  ),
});

export const uploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: buildRateLimitResponse(
    "Too many upload requests. Please try again later."
  ),
});

export default {
  generalLimiter,
  adminLoginLimiter,
  uploadLimiter,
};