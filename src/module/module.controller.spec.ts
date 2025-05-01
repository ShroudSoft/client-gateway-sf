import { Test, TestingModule } from '@nestjs/testing';
import { ModuleController } from './module.controller';

describe('ModuleController', () => {
  let controller: ModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleController],
      providers: [
        {
          provide: 'NATS_SERVICE',
          useValue: {
            emit: jest.fn(),
            send: jest.fn(),
            close: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ModuleController>(ModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
