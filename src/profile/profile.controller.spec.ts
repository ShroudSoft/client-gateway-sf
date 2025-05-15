import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { NatsModule } from 'src/transports/nats.module';

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NatsModule],
      controllers: [ProfileController],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
