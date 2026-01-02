import { Test, TestingModule } from '@nestjs/testing';
import { TodoRepo } from './todo.repo';

describe('TodoRepo', () => {
  let service: TodoRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoRepo],
    }).compile();

    service = module.get<TodoRepo>(TodoRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
