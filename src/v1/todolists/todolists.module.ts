import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import { TodolistsController } from './todolists.controller';
import { AuthorizationMiddleware } from '../authorization/authorization.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todolist } from './entities/todolist.entity';
import { Todo } from '../todo/entities/todo.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist, Todo, User])],
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
