import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

// Mock the module with the typo before importing the controller
jest.mock('src/config/sercices', () => ({
  NATS_SERVICE: 'NATS_SERVICE',
}));

// Now import the controller which depends on the mocked module
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  // Create a mock for the ClientProxy
  const mockClientProxy = {
    send: jest.fn().mockImplementation(() => of({})),
    connect: jest.fn(),
    close: jest.fn(),
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'NATS_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
