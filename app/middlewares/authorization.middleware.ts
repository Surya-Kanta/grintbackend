import {Request, Response, NextFunction} from 'express';
import UserSession from '../models/usersession';

export const AuthorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authToken: string = req.get('Authorization') || '';
    const tokens: Array<string> = authToken.split(' ');

    if ('Bearer' !== tokens?.[0] || !tokens?.[1]) {
        return res.status(401).send({
            "status": false,
            "message": 'Authorization not allowed!'
        });
    }

    const bearerToken = tokens[1]

    const session = await UserSession.findOne({session_id: bearerToken});

    if (!session || session.isExpired()) {
        return res.status(401).send({
            "status": false,
            "message": 'You are Unauthorized!'
        });
    }

    const user = await session.user();

    if (user) {
        res.locals.user = user;
        res.locals.session = session;
        next();
    }
}