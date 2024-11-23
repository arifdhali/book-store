const Joi = require('joi');

const AddSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name is required",
    }),
    description: Joi.string()
        .min(100)
        .required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 100 characters long",
        }),
});

module.exports = AddSchema;
