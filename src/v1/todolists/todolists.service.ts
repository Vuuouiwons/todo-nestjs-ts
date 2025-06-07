import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodolistDto, UpdateTodolistDto } from './dto';
import { JWTDecoded } from '../authorization/authorization.interface';
import { parseResponse } from '../dto/response';

import { Todo } from '../todo/entities/todo.entity';
import { Todolist } from './entities/todolist.entity';
import { User } from '../user/entities/user.entity';

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

    const newTodolistId = (await this.todolistsRepository.save(newTodolist)).id;

    const payload = { id: newTodolistId };

    return parseResponse(0,
      'TL',
      201,
      '',
      payload);
  }

  async findAllTodolist(userInformation: JWTDecoded,
    limit: number = 20,
    offset: number = 0) {
    const newTodolist = new Todolist();
    newTodolist.user = { id: userInformation.id } as User;

    const rawData = await this.todolistsRepository.find({
      take: limit,
      skip: offset,
      where: newTodolist
    });

    const data = rawData.map((d) => {
      const mappedData = {
        id: d.id,
        title: d.title,
        status: d.status
      }
      return mappedData;
    });

    return parseResponse(0,
      'TL',
      200,
      '',
      data);
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

    return parseResponse(0, 'TL', 201, '', updatedRow);
  }

  async remove(userInformation: JWTDecoded, todolistId: number) {
    const todo: Array<any> = await this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.todolist', 'todolist')
      .leftJoinAndSelect('todolist.user', 'user')
      .select('todo.id', 'todoId')
      .where('todolist.id = :todolistId', { todolistId })
      .andWhere('user.id = :userId', { userId: userInformation.id })
      .execute();

    const todoIds: Array<number> = todo.map(d => d.todoId);

    try {
      await this.todoRepository.delete(todoIds);
    } catch { }

    try {
      await this.todolistsRepository.delete(todolistId);
    } catch { }
  }

  async findAllTodoByTodolist(userInformation: JWTDecoded, todolistId: number, limit: number, offset: number) {
    const todo: Array<any> = await this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.todolist', 'todolist')
      .leftJoinAndSelect('todolist.user', 'user')
      .select('todo.id', 'id')
      .addSelect('todo.message', 'message')
      .addSelect('todo.status', 'status')
      .where('todolist.id = :todolistId', { todolistId })
      .andWhere('user.id = :userId', { userId: userInformation.id })
      .offset(offset)
      .limit(limit)
      .execute();

    return parseResponse(0,
      'TL',
      200,
      'success',
      todo);
  }
}
