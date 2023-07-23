import {Router} from 'express';
import {authRouter} from './auth.routes';
import ControllerErrorHandler from '../app/middlewares/error.middleware';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

// Global Exception catcher for all API routes
apiRouter.use(ControllerErrorHandler);

export {
    apiRouter
};