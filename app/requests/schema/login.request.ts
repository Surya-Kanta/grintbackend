import Joi from '@hapi/joi';

export const schema: Joi.ObjectSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
    password: Joi.string().length(40).required(),
})