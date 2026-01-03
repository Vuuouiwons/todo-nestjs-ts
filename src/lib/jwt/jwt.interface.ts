interface jwtGenerateI {
    id: number,
    username: string,
}

interface jwtValidateI {
    status: boolean,
    decoded?: jwtDecodedI
}

interface jwtDecodedI {
    username?: string,
    iat?: string
}

export { jwtGenerateI, jwtValidateI, jwtDecodedI }