import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';


describe('AppController', () => {
  let appController: AppController;
  let appService: jest.Mocked<AppService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            handleHealth: jest.fn().mockReturnValue({ status: 'ok' }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get(AppService);
  });

  it('/health should return { status: "ok" }', () => {
    const result = appController.health();
    expect(typeof result).toEqual(typeof {});
    expect(result).toEqual({ status: 'ok' });
  });

  it('/health should call health', () => {
    appController.health();
    expect((appService as any).handleHealth).toHaveBeenCalled();
  });
});