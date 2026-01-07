import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { TodolistRepo } from './repository/todolist.repo';
import { DatabaseModule } from 'src/common/database/database.providers';
import { SecurityModule } from 'src/libs/security/security.module';
import { UserRepo } from '../user/repository/user.repo';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [TodolistController],
  providers: [TodolistService, TodolistRepo, UserRepo],
})
export class TodolistModule { }
