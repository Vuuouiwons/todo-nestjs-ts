import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode } from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { Authorization } from '../authorization/authorization.decorator';
import { JWTDecoded } from '../authorization/authorization.interface';

@Controller('todolists')
export class TodolistsController {
  constructor(private readonly todolistsService: TodolistsService) { }

  @HttpCode(201)
  @Post('')
  create(@Authorization() userInformation: JWTDecoded,
    @Body() createTodolistDto: CreateTodolistDto) {

    return this.todolistsService.create(userInformation, createTodolistDto);
  }

  @Get('')
  findAll(@Authorization() userInformation: JWTDecoded,
    @Query('limit') limit: string, @Query('offset') offset: string) {
    return this.todolistsService.findAllTodolist(userInformation, +limit, +offset);
  }

  @Get(':listId')
  findAllTodo(@Authorization() userInformation: JWTDecoded,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Param('listId') todolistId: string) {
    return this.todolistsService.findAllTodoByTodolist(userInformation, +todolistId, +limit, +offset);
  }

  @HttpCode(201)
  @Put(':listId')
  update(@Authorization() userInformation: JWTDecoded,
    @Param('listId') todolistId: string,
    @Body() updateTodolistDto: UpdateTodolistDto) {
    return this.todolistsService.update(userInformation, +todolistId, updateTodolistDto);
  }

  @HttpCode(204)
  @Delete(':listId')
  remove(@Authorization() userInformation: JWTDecoded,
    @Param('listId') todolistId: string) {
    return this.todolistsService.remove(userInformation, +todolistId);
  }
}
