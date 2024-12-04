const Joi = require('joi');

const reviewValidationSchema = Joi.object({
  user: Joi.string().required(), // Mongoose ObjectId as a string
  product: Joi.string(), // Optional, Mongoose ObjectId
  store: Joi.string(), // Optional, Mongoose ObjectId
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500),
}).xor('product', 'store').messages({
  'object.missing': 'A review must be associated with either a product or a store',
});

module.exports = reviewValidationSchema;
