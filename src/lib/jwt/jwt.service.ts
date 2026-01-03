import { jwtDecodedI, jwtGenerateI, jwtValidateI } from './jwt.interface';
const jwt = require('jsonwebtoken');


const jwtGenerate = (data: jwtGenerateI): string => {
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return token;
}

const jwtValidate = (token: string): jwtValidateI => {
    const payload: jwtValidateI = { status: false };

    jwt.verify(token, process.env.JWT_SECRET, { maxAge: process.env.JWT_AGE }, (err: any, decoded: jwtDecodedI) => {
        if (err) {
            return payload;
        };

        payload.status = true;
        payload.decoded = decoded;

        return payload;
    })

    return payload;
}

export { jwtValidate, jwtGenerate }