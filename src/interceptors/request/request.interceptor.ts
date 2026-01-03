import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const reqId = uuidv4();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    request['requestId'] = reqId;
    response.setHeader('X-Request-Id', reqId);

    return next
      .handle()
      .pipe(
        map((data) => {
          if (!data) return;

          const { statusCode } = response;
          const { originalUrl, method } = request;

          const parsedData = {
            meta: {
              timestamp: new Date().toISOString(),
              statusCode,
              path: originalUrl,
              method
            },
            data
          };

          return parsedData;
        }));
  }
}
