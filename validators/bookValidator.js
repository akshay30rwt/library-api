const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().valid('Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Other').required(),
    year: Joi.number().min(1000).max(2026).required(),
    pages: Joi.number().min(1).required()
});

module.exports = { bookSchema };