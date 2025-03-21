import { NextFunction, Request, Response } from "express";
import { getUserByQuery } from "../controllers/utils";
import * as jwt from "jsonwebtoken";


export interface IJwtPayloadWithId extends jwt.JwtPayload {
    id: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.SECRET_KEY;

    if (!token) {
        res.status(401).json({ message: 'User not authorized.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, secret as string) as IJwtPayloadWithId;
        if (!decoded.id) {
            res.status(401).json({ message: 'Invalid token.' });
            return;
        }
        const user = await getUserByQuery({ _id: decoded.id })
        if (!user) {
            res.status(401).json({ message: 'Unable to find user' });
            return;
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
        return;
    }
};

export default authMiddleware;