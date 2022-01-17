import * as jwt from "jsonwebtoken"

const generateToken = (uid = '') => {
    
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SEED, {
            expiresIn: process.env.EXP_TOKEN
        }, (err: any, token: any) => {
            
            if (err) {
                console.log(err);
                reject('Token could not be generated');
            } else {
                resolve( token );
            }

        });
    })
}

export {
    generateToken
}