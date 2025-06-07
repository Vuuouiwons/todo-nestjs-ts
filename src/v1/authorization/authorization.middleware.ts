import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { jwtValidate } from '../../common/jwt';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const tokenHeader = req.headers.authorization;
        if (!tokenHeader) throw new HttpException("missing authorization token", HttpStatus.FORBIDDEN);

        const [authType, token] = tokenHeader!.split(' ');
        if (authType !== "Bearer") throw new HttpException("authorization type unknown", HttpStatus.UNAUTHORIZED);

        const { status, decoded } = jwtValidate(token);
        if (!status) throw new HttpException('token invalid', HttpStatus.UNAUTHORIZED);

        req.userInformation = decoded;
        next();
    }
}
