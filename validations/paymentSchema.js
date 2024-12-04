const Joi = require('joi');

const paymentValidationSchema = Joi.object({
  order: Joi.string().required(), // Mongoose ObjectId as a string
  user: Joi.string().required(), // Mongoose ObjectId as a string
  paymentMethod: Joi.string().valid('stripe', 'chappa').required(),
  amount: Joi.number().min(0).required(),
  transactionId: Joi.string().required(),
  status: Joi.string().valid('pending', 'completed', 'failed'),
  currency: Joi.string().default('USD'),
});

module.exports = paymentValidationSchema;
