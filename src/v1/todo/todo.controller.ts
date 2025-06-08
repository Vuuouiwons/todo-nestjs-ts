import { Controller, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { CreateTodoDto, UpdateTodoDto } from './dto';
import { TodoService } from './todo.service';

import { Authorization } from '../authorization/authorization.decorator';
import { JWTDecoded } from '../authorization/authorization.interface';

@Controller('todolists/:todolistId/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  create(@Authorization() userInformation: JWTDecoded,
    @Param('todolistId') todolistId: string,
    @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(userInformation, +todolistId, createTodoDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put(':todoId')
  update(@Authorization() userInformation: JWTDecoded,
    @Param('todolistId') todolistId: string,
    @Param('todoId') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(userInformation, +todolistId, +todoId, updateTodoDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':todoId')
  remove(@Authorization() userInformation: JWTDecoded,
    @Param('todolistId') todolistId: string,
    @Param('todoId') todoId: string) {
    return this.todoService.remove(userInformation, +todolistId, +todoId);
  }
}
