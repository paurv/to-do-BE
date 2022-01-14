import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

let Schema = mongoose.Schema;
let userSchema = new Schema(
    {
        name: { 
            type: String, 
            required: [true, 'Name is necessary'], 
            trim: true 
        },
        email: { 
            type: String, 
            required: [true, 'Email is necessary'], 
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is necessary'],
            trim: true
        }
    },
    {
        versionKey: false
    }
);

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;