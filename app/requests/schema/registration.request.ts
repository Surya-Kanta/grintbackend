import Joi from '@hapi/joi';

export const schema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
    password: Joi.string().length(40).required(),
    password_confirmation: Joi.ref('password')
})
.with('password', 'password_confirmation')