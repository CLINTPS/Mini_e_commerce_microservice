import Joi from 'joi'

export const signupValidation = Joi.object({
    username:Joi
        .string()
        .min(4),
    email:Joi
        .string()
        .email()
        .pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        .required(),
        password: Joi
        .string()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required(),
    role: Joi
        .string()
})