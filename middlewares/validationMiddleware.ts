import { Context, Next } from 'hono';
import { Schema } from 'joi';

/**
 * Validation Middleware
 * Validates request data against a Joi schema.
 * @param {Object} schema - Joi schema to validate request data.
 * @returns {Function} Middleware function.
 */
const validationMiddleware = (schema: Schema) => async (c: Context, next: Next) => {
  try {
    const body = await c.req.json();
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      return c.json({
        error: true,
        message: 'Validation failed',
        details: validationErrors,
      }, 400);
    }
    await next();
  } catch (error: any) {
    return c.json({ error: true, message: 'Server error during validation' }, 500);
  }
};

export default validationMiddleware;
