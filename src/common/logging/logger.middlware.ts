import { Injectable, NestMiddleware,Logger} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('Content-Length') ?? 0;
      const duration = Date.now() - start;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${contentLength}b - ${duration}ms`,
      );
    });

    next();
  }
}