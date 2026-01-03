import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { AuthorizationMiddleware } from '../authorization/authorization.middleware';

import { Todo } from './entities/todo.entity';
import { Todolist } from '../todolists/entities/todolist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist, Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(TodoController);
  }
}
