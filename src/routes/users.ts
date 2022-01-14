import express,  { Request, Response, NextFunction } from "express";
import validateFields from "../middlewares/validate-fields";
import { emailExist } from "../helpers/validators"
import User from "../models/user.model";

import { check, validationResult } from 'express-validator';
import * as bcrypt from 'bcrypt';


const userRouter = express();

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
userRouter.post('/signin', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( emailExist ),
    validateFields
], signIn);


export default userRouter;