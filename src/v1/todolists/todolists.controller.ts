import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';

@Controller('todolists')
export class TodolistsController {
  constructor(private readonly todolistsService: TodolistsService) {}

  @Post()
  create(@Body() createTodolistDto: CreateTodolistDto) {
    return this.todolistsService.create(createTodolistDto);
  }

  @Get()
  findAll() {
    return this.todolistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todolistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodolistDto: UpdateTodolistDto) {
    return this.todolistsService.update(+id, updateTodolistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todolistsService.remove(+id);
  }
}
