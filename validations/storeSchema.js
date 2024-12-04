const Joi = require('joi');

const storeValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500),
  logo: Joi.string().uri().messages({
    'string.uri': 'Logo must be a valid URL',
  }),
  bannerImage: Joi.string().uri().messages({
    'string.uri': 'Banner image must be a valid URL',
  }),
  owner: Joi.string().required(), // Mongoose ObjectId as a string
  businessRegistrationNumber: Joi.string().max(30),
  isApproved: Joi.boolean(),
  isActive: Joi.boolean(),
});

module.exports = storeValidationSchema;
