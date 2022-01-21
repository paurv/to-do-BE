import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    // if ( !token ) {
    //     return res.status(401).json({
    //         error: 'Token is needed'
    //     })
    // }
    try {
        // const { uid } = jwt.verify( token, process.env.SEED );
        // req['uid'] = uid;
        
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            error: 'Invalid token'
        })
    }
}

export default validateToken;
