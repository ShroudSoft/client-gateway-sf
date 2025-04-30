import { Module } from '@nestjs/common';
import { BusinessUserController } from './business-user.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [BusinessUserController],
})
export class BusinessUserModule {}
