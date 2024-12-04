const Joi = require('joi');

const discountValidationSchema = Joi.object({
  code: Joi.string().min(3).max(20).required(),
  store: Joi.string().required(), // Mongoose ObjectId as a string
  type: Joi.string().valid('percentage', 'fixed').required(),
  value: Joi.number().min(0).required(),
  maxDiscount: Joi.number().min(0),
  minOrderValue: Joi.number().min(0).default(0),
  usageLimit: Joi.number().integer(),
  usedCount: Joi.number().integer().default(0),
  startDate: Joi.date(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  isActive: Joi.boolean(),
});

module.exports = discountValidationSchema;
