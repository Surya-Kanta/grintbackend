import {Router} from 'express';
import {LoginController, RegistrationController, ProfileController} from '../app/controllers/auth.controller';
import { AuthorizationMiddleware } from '../app/middlewares/authorization.middleware';
import ValidationRequest from '../app/requests/validation.request';

const authRouter = Router();

authRouter.post('/login', ValidationRequest('login'), LoginController);
authRouter.post('/register', ValidationRequest('registration'), RegistrationController);

authRouter.get('/me', AuthorizationMiddleware, ProfileController);

export {
    authRouter
};