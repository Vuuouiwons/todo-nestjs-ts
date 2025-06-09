import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto, UpdateTodoDto } from './dto';


import { Todo } from './entities/todo.entity';
import { Todolist } from '../todolists/entities/todolist.entity';
import { JWTDecoded } from '../authorization/authorization.interface';
import { parseResponse } from '../dto/response';
import { todoMap } from './mappings';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Todolist) private readonly todolistsRepository: Repository<Todolist>
  ) { }

  async create(userInformation: JWTDecoded,
    todolistId: number,
    createTodoDto: CreateTodoDto) {
    const userId = userInformation.id;
    const todoMessage = createTodoDto.message;
    const todolist = await this.todolistsRepository.findOne({
      where: {
        id: todolistId,
        user: { id: userId },
      },
    });

    if (!todolist) {
      throw new HttpException('todolist not found', HttpStatus.NOT_FOUND);
    }

    const newTodo = new Todo();

    newTodo.todolist = { id: todolistId } as Todolist;
    newTodo.message = todoMessage;

    const newTodoStatus = await this.todoRepository.save(newTodo);

    return parseResponse(0,
      'TO',
      HttpStatus.CREATED,
      'success',
      todoMap(newTodoStatus));
  }

  async update(userInformation: JWTDecoded,
    todolistId: number,
    todoId: number,
    updateTodoDto: UpdateTodoDto) {

    const userId = userInformation.id;

    let todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
        todolist: {
          id: todolistId,
          user: {
            id: userId
          },
        },
      },
      relations: ['todolist', 'todolist.user'],
    });

    if (!todo) {
      throw new HttpException('todo not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(todo, updateTodoDto);

    const todoStatus = await this.todoRepository.save(todo);

    return parseResponse(0,
      'TO',
      HttpStatus.OK,
      '',
      todoMap(todoStatus));
  }

  async remove(userInformation: JWTDecoded,
    todolistId: number,
    todoId: number) {

    const userId = userInformation.id;

    const todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
        todolist: {
          id: todolistId,
          user: {
            id: userId
          }
        }
      },
      relations: ['todolist', 'todolist.user']
    });

    if (!todo) throw new HttpException('todo not found', HttpStatus.NOT_FOUND);

    await this.todoRepository.remove([todo]);

    return parseResponse(0,
      'TO',
      HttpStatus.NO_CONTENT,
      '',
      null);
  }
}
