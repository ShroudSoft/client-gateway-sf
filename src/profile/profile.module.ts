import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
