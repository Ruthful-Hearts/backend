const compression = require('compression');

/**
 * Compression Middleware
 * Compresses response bodies for all requests.
 */
const compressionMiddleware = (req, res, next) => {
  compression({
    level: 6, // Default compression level (range: 0–9)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
      // Compress only if the content type matches
      const contentType = res.getHeader('Content-Type');
      if (/json|text|javascript|css|html/.test(contentType)) {
        return true;
      }
      return false;
    },
  })(req, res, next);
};

module.exports = compressionMiddleware;
