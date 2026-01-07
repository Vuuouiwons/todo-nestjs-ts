import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(IdentityInterceptor)
@Controller({
  path: 'todolist', version: '1'
})
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @Post()
  create(
    @Req() request,
    @Body() createTodolistDto: CreateTodolistDto
  ) {
    return this.todolistService.create(request.user, createTodolistDto);
  }

  @Get()
  findAll(@Req() request) {
    return this.todolistService.findAll(request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todolistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodolistDto: UpdateTodolistDto) {
    return this.todolistService.update(+id, updateTodolistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todolistService.remove(+id);
  }
}
