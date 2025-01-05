const logger = require('../utils/loggerUtil');

const logRequest = async (c, next) => {
  const startTime = Date.now();

  // Log the incoming request
  logger.info(
    `Incoming request: ${c.req.method} ${c.req.url} - IP: ${c.req.remoteAddr}`
  );

  try {
    await next(); // Pass control to the next middleware or route handler
  } catch (error) {
    // Log any errors that occur
    logger.error(`Error occurred: ${error.message}`);
    throw error; // Re-throw the error for further handling
  } finally {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Log the response status and duration
    logger.info(
      `Response sent: ${c.res.status} - Duration: ${duration}ms`
    );
  }
};

module.exports = logRequest;
