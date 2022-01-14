import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

// =================================
// Verify token
// =================================
const verifyToken = ( req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, ( err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                error: err
            })
        }
        req['user'] = decoded['user'];
        next();
    });
}

export { verifyToken }