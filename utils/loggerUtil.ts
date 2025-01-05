const { createLogger, format, transports } = require('winston');

// Define the logger
const logger = createLogger({
  level: 'info', // Logging level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'logs/combined.log' }), // Log all messages to a file
  ],
});

// Add a stream for Morgan (HTTP request logging)
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
