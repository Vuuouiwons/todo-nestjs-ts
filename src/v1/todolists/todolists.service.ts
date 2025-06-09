import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodolistDto, UpdateTodolistDto } from './dto';
import { JWTDecoded } from '../authorization/authorization.interface';
import { parseResponse } from '../dto/response';

import { Todo } from '../todo/entities/todo.entity';
import { Todolist } from './entities/todolist.entity';
import { User } from '../user/entities/user.entity';

import { todoMap } from '../todo/mappings';
import { todolistMap } from './mappings';

@Injectable()
export class TodolistsService {
  constructor(
    @InjectRepository(Todolist) private readonly todolistsRepository: Repository<Todolist>,
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
  ) { }

  async create(userInformation: JWTDecoded, createTodolistDto: CreateTodolistDto) {
    const newTodolist = new Todolist();
    newTodolist.title = createTodolistDto.title;
    newTodolist.user = { id: userInformation.id } as User;

    const newTodolistStatus = await this.todolistsRepository.save(newTodolist);

    return parseResponse(0,
      'TL',
      201,
      '',
      todolistMap(newTodolistStatus));
  }

  async findAllTodolist(userInformation: JWTDecoded,
    limit: number = 20,
    offset: number = 0) {
    const newTodolist = new Todolist();
    newTodolist.user = { id: userInformation.id } as User;

    const todolist = await this.todolistsRepository.find({
      take: limit,
      skip: offset,
      where: newTodolist
    });

    return parseResponse(0,
      'TL',
      200,
      '',
      todolist.map(todolistMap));
  }

  async update(userInformation: JWTDecoded, todolistId: number, updateTodolistDto: UpdateTodolistDto) {
    const todolist = await this.todolistsRepository.findOne({
      where: {
        id: todolistId,
        user: { id: userInformation.id }
      }
    })

    if (!todolist) {
      throw new HttpException('Todolist not found', HttpStatus.BAD_REQUEST);
    }
    Object.assign(todolist, updateTodolistDto);

    const updatedRow = await this.todolistsRepository.save(todolist)

    return parseResponse(0, 'TL', 201, '', todolistMap(updatedRow));
  }

  async remove(userInformation: JWTDecoded, todolistId: number) {
    const userId = userInformation.id;

    const todolist = await this.todolistsRepository.findOne({
      where: {
        id: todolistId,
        user: {
          id: userId,
        },
      }
    });

    if (!todolist) throw new HttpException('todolist not found', HttpStatus.NOT_FOUND);

    const todo = await this.todoRepository.find({
      where: {
        todolist: {
          id: todolistId,
          user: {
            id: userId
          }
        }
      },
      relations: ['todolist', 'todolist.user']
    });

    const todoStatus = await this.todoRepository.remove(todo);
    const todolistStatus = await this.todolistsRepository.remove(todolist);
  }

  async findAllTodoByTodolist(userInformation: JWTDecoded, todolistId: number, limit: number, offset: number) {
    const userId = userInformation.id;

    const todo = await this.todoRepository.find({
      where: {
        todolist: {
          id: todolistId,
          user: {
            id: userId
          }
        }
      },
      skip: offset,
      take: limit,
    });

    return parseResponse(0,
      'TL',
      200,
      'success',
      todo.map(todoMap));
  }
}
