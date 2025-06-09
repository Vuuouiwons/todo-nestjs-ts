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
    const userId = userInformation.id;

    const newTodolist = new Todolist();
    newTodolist.title = createTodolistDto.title;
    newTodolist.user = {
      id: userId
    } as User;

    const newTodolistStatus = await this.todolistsRepository.save(newTodolist);

    return parseResponse(0,
      'TL',
      HttpStatus.CREATED,
      '',
      todolistMap(newTodolistStatus));
  }

  async findAllTodolist(userInformation: JWTDecoded,
    limit: number = 20,
    offset: number = 0) {

    const userId = userInformation.id;

    const todolist = await this.todolistsRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      take: limit,
      skip: offset,
    });

    return parseResponse(0,
      'TL',
      HttpStatus.OK,
      '',
      todolist.map(todolistMap));
  }

  async update(userInformation: JWTDecoded, todolistId: number, updateTodolistDto: UpdateTodolistDto) {
    const userId = userInformation.id;

    const todolist = await this.todolistsRepository.findOne({
      where: {
        id: todolistId,
        user: {
          id: userId
        }
      }
    })

    if (!todolist) {
      throw new HttpException('Todolist not found', HttpStatus.BAD_REQUEST);
    }
    Object.assign(todolist, updateTodolistDto);

    const updatedRow = await this.todolistsRepository.save(todolist)

    return parseResponse(0,
      'TL',
      HttpStatus.OK,
      '',
      todolistMap(updatedRow));
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

    return parseResponse(0,
      'TL',
      HttpStatus.NO_CONTENT,
      '',
      null
    );
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
      HttpStatus.OK,
      'success',
      todo.map(todoMap));
  }
}
