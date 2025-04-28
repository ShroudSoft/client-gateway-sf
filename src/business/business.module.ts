import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [BusinessController],
})
export class BusinessModule {}
