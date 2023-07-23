import { NextFunction, Request, Response } from "express";
import ErrorException from "../exceptions/ErrorException";

// All the common controller related code will be here

// This function is a wrapper to all controller methods to use any common code
export const PreController = (func: Function) => {
    return (request: Request, response: Response, next: NextFunction) => {
        func(request, response, next)
            .catch((err: ErrorException) => next(err))
            .catch((err: Error) => next(new ErrorException(err.message)));
    }
}