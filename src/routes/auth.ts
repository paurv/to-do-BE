import express,  { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

import { check } from "express-validator";
import validateFields from "../middlewares/validate-fields";

const authRouter = express();


const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                error: 'User or password is not valid - ema'
            });
        }
        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ) {
            return res.status(400).json({
                error: 'User or password is not valid - pass'
            });
        }
    } catch (e) {
        return res.status(500 ).json({
            msg: 'Error at login'
        })
    }
    res.json({
        ok: true,
        data: 'Login ok'
    })
}
authRouter.post('/login', [
    check('email', 'Mail is mandatory.').isEmail(),
    check('password', 'Password is mandatory.').not().isEmpty(),
    validateFields
], login);


const register = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10)
    });
    user.save()
        .then( response => {
            const token = jwt.sign(
                { user: user },
                process.env.SEED,
                { expiresIn: process.env.EXP_TOKEN}
            )
            res.json({
                ok: true,
                user: response,
                token  
            })
        }).catch( err => {
            res.status(400).json({
                ok: false,
                error: err
            });
        })
}
authRouter.post('/register', register);


export default authRouter;