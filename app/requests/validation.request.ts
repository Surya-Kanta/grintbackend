import Joi from "@hapi/joi";
import { NextFunction, Request, Response } from "express";
import ErrorException from "../exceptions/ErrorException";

const ValidationRequest = (key: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const {schema} = require(`./schema/${key}.request`);

        const validated: Joi.ValidationResult = await schema.validate(req.body);

        if (validated.error) {
            return next(new ErrorException('VALIDATIONERROR', {
                errors: validated.error.details
            }));
        }
        
        next();
    }
}

export default ValidationRequest;