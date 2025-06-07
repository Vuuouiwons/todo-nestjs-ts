import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodolistsService } from './todolists.service';
import { TodolistsController } from './todolists.controller';
import { AuthorizationMiddleware } from '../authorization/authorization.middleware';

import { Todolist } from './entities/todolist.entity';
import { Todo } from '../todo/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist, Todo])],
  controllers: [TodolistsController],
  providers: [TodolistsService],
})
export class TodolistsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(TodolistsController);
  }
}
