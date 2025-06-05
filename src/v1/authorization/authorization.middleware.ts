import { Injectable, NestMiddleware } from '@nestjs/common';
import { parseResponse } from '../dto/response';
import { JWTDecoded } from './authorization.interface';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
        const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        res
            .status(403)
            .send(parseResponse(0, "MO", 403, "missing authorization token", null))
    }

    const [authType, token] = tokenHeader!.split(' ');

    if (authType !== "Bearer") {
        res.status(401).send(parseResponse(0, "MO", 401, "Authorization type unknown", null));
    }

    jwt.verify(token, process.env.JWT_SECRET, { maxAge: process.env.JWT_AGE }, (err: any, decoded: JWTDecoded) => {
        if (err) {
            res.status(401).send(parseResponse(0, "MO", 401, 'Token Invalid', null));
            return;
        };
        res.locals.jwtDecoded = decoded;
    });

    next();
  }
}
