import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { TodolistRepo } from './repository/todolist.repo';

@Module({
  controllers: [TodolistController],
  providers: [TodolistService, TodolistRepo],
})
export class TodolistModule { }
