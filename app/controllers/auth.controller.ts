import {NextFunction, Request, Response} from 'express';
import User from '../models/user';
import { PreController } from './controller';
import ErrorException from '../exceptions/ErrorException';

const LoginController =  PreController(async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.where('email', email).findOne();
    if (!user) {
        return next(new ErrorException('INVALIDEMAIL'));
    }

    if (password !== user.password) {
        return next(new ErrorException('INVALIDPASSWORD'));
    }

    const session = await user.createSession();

    res.status(200).json({
        "status": true,
        "response": {
            "session_token": session.session_id
        }
    });
});

const RegistrationController =  PreController(async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.where('email', email).findOne();

    if (user) {
        return next(new ErrorException('EMAILALREADYEXISTS'));
    }
    
    const newUser = await User.create({
        name,
        email,
        password
    });

    if (newUser) {
        res.status(201).json({
            "status": true,
            "message": 'Registration successful'
        });
    }
});

const ProfileController = PreController(async (req: Request, res: Response) => {
    res.status(200).json({
        "status": true,
        "response": {
            "user": res.locals.user
        }
    });
});


export {
    LoginController,
    RegistrationController,
    ProfileController
}