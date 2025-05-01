import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';

describe('QuestionController', () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
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

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
