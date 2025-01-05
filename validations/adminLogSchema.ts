import Joi from "joi";

const adminLogValidationSchema = Joi.object({
  admin: Joi.string().required(), // Mongoose ObjectId as a string
  action: Joi.string().valid(
    'store_approval',
    'product_approval',
    'user_management',
    'discount_management',
    'order_management',
    'other'
  ).required(),
  target: Joi.string().required(),
  description: Joi.string().max(500),
  status: Joi.string().valid('success', 'failure').default('success'),
  metadata: Joi.object(),
});

module.exports = adminLogValidationSchema;
