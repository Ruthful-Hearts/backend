/**
 * Validation Middleware
 * Validates request data against a Joi schema.
 * @param {Object} schema - Joi schema to validate request data.
 * @returns {Function} Middleware function.
 */
const validationMiddleware = (schema) => async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false }); // Validate request body
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        error: true,
        message: 'Validation failed',
        details: validationErrors,
      });
    }
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    res.status(500).json({ error: true, message: 'Server error during validation' });
  }
};

module.exports = validationMiddleware;
