import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ModuleController],
})
export class ModuleModule {}
