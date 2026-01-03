import { Test, TestingModule } from '@nestjs/testing';
import { TodolistRepo } from './todolist.repo';

describe('TodolistRepo', () => {
  let service: TodolistRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodolistRepo],
    }).compile();

    service = module.get<TodolistRepo>(TodolistRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
