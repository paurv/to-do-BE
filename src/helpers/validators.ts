import User from "../models/user.model"

const emailExist  = async( email = '') => {
    const emailExist = await User.findOne({ email });
    if ( emailExist ) {
        throw new Error(`The email ${ email } is already taken.`)
    }
}

export {
    emailExist
}