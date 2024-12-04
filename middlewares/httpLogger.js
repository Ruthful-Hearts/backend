const morgan = require('morgan');
const logger = require('../utils/logger');

// Configure Morgan to use Winston
const httpLogger = morgan('combined', { stream: logger.stream });

module.exports = httpLogger;
