//@hopi/joi for Validataion
const Joi = require("@hapi/joi");

// Register Validation

const registerValidation = (data) => {
    // Let validate the data before we a user

    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

// Login  Validation
const loginValidation = (data) => {
    // Let validate the data before we a user

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;