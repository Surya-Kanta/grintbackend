import { Request, Response, NextFunction } from "express";
import ErrorException from "../exceptions/ErrorException";

const ControllerErrorHandler = (error: ErrorException, request: Request, response: Response, next: NextFunction) => {
    return next(response.status(error.statusCode || 500).json(error.render ? error.render() : error.message));
}

export default ControllerErrorHandler;