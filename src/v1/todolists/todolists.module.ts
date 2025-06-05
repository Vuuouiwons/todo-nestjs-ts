import { Module } from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import { TodolistsController } from './todolists.controller';

@Module({
  controllers: [TodolistsController],
  providers: [TodolistsService],
})
export class TodolistsModule {}
