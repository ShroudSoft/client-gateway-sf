import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from './business.controller';

describe('BusinessController', () => {
  let controller: BusinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      controllers: [BusinessController],
    }).compile();

    controller = module.get<BusinessController>(BusinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
