import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

// Mock the services config before importing the controller
jest.doMock('src/config/sercices', () => ({
  NATS_SERVICE: 'NATS_SERVICE',
}));

import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  // Create a mock for the ClientProxy
  const mockClientProxy = {
    send: jest.fn().mockImplementation(() => of({})),
    connect: jest.fn(),
    close: jest.fn(),
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'NATS_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
