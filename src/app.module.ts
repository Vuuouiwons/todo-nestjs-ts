import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.providers';
import { LoggerMiddleware } from './middlewares/logging/logger.middlware';
import { UserController } from './modules/resources/users/user.controller';
import { UserService } from './modules/resources/users/user.service';
import { RequestInterceptor } from './interceptors/request/request.interceptor';
import { HttpExceptionFilter } from './exceptionFilters/http-exception/http-exception.filter';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
