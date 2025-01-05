import Joi from "joi";

const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(1000),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0),
  images: Joi.array().items(Joi.string().uri().messages({
    'string.uri': 'Each image must be a valid URL',
  })),
  is3DViewEnabled: Joi.boolean(),
  variations: Joi.object({
    colors: Joi.array().items(Joi.string()),
    sizes: Joi.array().items(Joi.string()),
  }),
  store: Joi.string().required(), // Mongoose ObjectId as a string
  category: Joi.string().min(3).max(50).required(),
  isApproved: Joi.boolean(),
  isActive: Joi.boolean(),
});

module.exports = productValidationSchema;
