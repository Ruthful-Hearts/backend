const Joi = require('joi');

const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('customer', 'store_owner', 'admin'),
  contactInfo: Joi.object({
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
      'string.pattern.base': 'Phone number must be a valid 10-digit number',
    }),
    address: Joi.string().max(100),
  }),
  adminDetails: Joi.object({
    position: Joi.string().max(50),
    officeContact: Joi.string().pattern(/^[0-9]{10}$/).messages({
      'string.pattern.base': 'Office contact must be a valid 10-digit number',
    }),
  }),
});

module.exports = userValidationSchema;
