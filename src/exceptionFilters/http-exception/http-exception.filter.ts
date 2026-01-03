import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = isHttpException ? exception.getResponse() : 'Internal Server Error';
    const errorId = uuidv4();

    let message: any = null;
    let error: string | undefined;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const res = exceptionResponse as any;
      message = res.message;
      error = res.error ? res.error : 'InternalServerError';
    }

    const meta = {
      statusCode: status,
      error,
      timestamp: new Date().toISOString(),
      errorId
    };

    if (status >= 500) {
      console.error(`ERROR: ${message}`);

      return response
        .status(status)
        .json({
          meta,
          message: "something went wrong, please try again."
        });
    };

    if (status >= 400) {
      return response
        .status(status)
        .json({
          meta,
          message
        });
    }
  }
}