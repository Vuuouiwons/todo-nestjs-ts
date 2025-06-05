import { Test, TestingModule } from '@nestjs/testing';
import { TodolistsController } from './todolists.controller';
import { TodolistsService } from './todolists.service';

describe('TodolistsController', () => {
  let controller: TodolistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistsController],
      providers: [TodolistsService],
    }).compile();

    controller = module.get<TodolistsController>(TodolistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
