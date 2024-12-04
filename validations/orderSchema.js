const Joi = require('joi');

const orderValidationSchema = Joi.object({
  user: Joi.string().required(), // Mongoose ObjectId as a string
  store: Joi.string().required(), // Mongoose ObjectId as a string
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().required(), // Mongoose ObjectId as a string
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().min(0).required(),
    })
  ).min(1).required(),
  totalAmount: Joi.number().min(0).required(),
  status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'canceled'),
  payment: Joi.string(), // Optional, Mongoose ObjectId
  shippingAddress: Joi.object({
    addressLine1: Joi.string().max(100).required(),
    addressLine2: Joi.string().max(100),
    city: Joi.string().max(50).required(),
    state: Joi.string().max(50),
    postalCode: Joi.string().max(20).required(),
    country: Joi.string().max(50).required(),
  }),
});

module.exports = orderValidationSchema;
