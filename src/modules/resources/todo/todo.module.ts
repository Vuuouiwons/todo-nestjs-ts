import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepo } from './repository/todo.repo';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoRepo],
})
export class TodoModule { }
