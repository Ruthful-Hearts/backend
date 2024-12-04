const rateLimit = require('express-rate-limit');

/**
 * General rate limiter middleware.
 * Limits each IP to 100 requests per 15 minutes.
 */
const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    error: true,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Strict rate limiter middleware for sensitive endpoints.
 * Limits each IP to 10 requests per minute.
 */
const strictRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per window
  message: {
    error: true,
    message: 'Too many requests to this endpoint, please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const userBasedRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each user to 10 requests per minute
  keyGenerator: (req) => req.user?.id || req.ip, // Use user ID if authenticated, otherwise fallback to IP
  message: {
    error: true,
    message: 'Too many requests, please slow down.',
  },
});

module.exports = {
  generalRateLimiter,
  strictRateLimiter,
  userBasedRateLimiter,
};
