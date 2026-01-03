interface JWTDecoded {
    id: number,
    username: string,
    iat: number
}

declare module 'express' {
    interface Request {
        userInformation?: JWTDecoded
    }
}

export { JWTDecoded }