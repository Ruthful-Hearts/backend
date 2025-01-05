const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

/**
 * Security Middleware
 * Combines Helmet, CORS, and other security configurations.
 */
const securityMiddleware = (app) => {
  // Helmet for securing HTTP headers
  app.use(helmet());

  // CORS (Cross-Origin Resource Sharing) configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS || '*', // Restrict origins for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Enable cookies for cross-origin requests
  }));

  app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // Prevent access via JavaScript
    secure: process.env.NODE_ENV === 'production', // HTTPS-only in production
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

  // Disable the X-Powered-By header
  app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });
};

module.exports = securityMiddleware;
