import express,  { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";

import validateFields from "../middlewares/validate-fields";
import User from "../models/user.model";

import { generateToken } from "../helpers/generate-token";
import { emailExist } from "../helpers/validators"
import { check } from "express-validator";

const authRouter = express();

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginError = { error: 'User or password is not valid' };
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json(loginError);
        }
        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ) {
            return res.status(400).json(loginError);
        }
        
        const token = await generateToken( user.id );
        
        return res.json({
            ok: true,
            data: 'Login ok!',
            user,
            token
        })
    } catch (e) {
        console.log(e);
        
        return res.status(500).json({
            msg: 'Error at login'
        })
    }
}
authRouter.post('/login', [
    check('email', 'Mail is mandatory.').isEmail(),
    check('password', 'Password is mandatory.').not().isEmpty(),
    validateFields
], login);


const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email } = req.body;
    const user = new User({ name, password, email });
    try {
        const salt    = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        await user.save();
        res.json({
            ok: true,
            data: user
        })
    } catch (e) {
        res.status(500).json({
            ok: false,
            error: 'Something went wrong loggin in'
        })
    }
}
authRouter.post('/signin', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( emailExist ),
    validateFields
], signIn);


export default authRouter;