import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [UserController],
})
export class UserModule {}
