const Joi = require('joi');
const AppError = require('../utils/appError');

// Bonus 2: Reusable Validation Middleware
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const message = error.details.map(el => el.message).join(', ');
        return next(new AppError(message, 400));
    }
    
    next();
};

// Task 3: Schemas for different requests
const schemas = {
    signup: Joi.object({
        username: Joi.string().min(3).required().messages({
            'string.min': 'Username must be at least 3 characters long',
            'any.required': 'Username is required'
        }),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    
    signin: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    
    post: Joi.object({
        title: Joi.string().min(5).max(100).required(),
        content: Joi.string().min(10).required()
    }),
    
    comment: Joi.object({
        content: Joi.string().required(),
        post: Joi.string().hex().length(24).required() // Validates ObjectId format
    })
};

module.exports = { validate, schemas };
