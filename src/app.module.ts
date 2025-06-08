import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './v1/hello/hello.module';
import { UserModule } from './v1/user/user.module';
import { TodolistsModule } from './v1/todolists/todolists.module';
import { TodoModule } from './v1/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/logging/logger.middlware';
import { User } from './v1/user/entities/user.entity';
import { Todo } from './v1/todo/entities/todo.entity';
import { Todolist } from './v1/todolists/entities/todolist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Todo, Todolist],
      synchronize: true,
    }),
    HelloModule, UserModule, TodolistsModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
