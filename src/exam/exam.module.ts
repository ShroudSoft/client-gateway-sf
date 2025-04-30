import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { NatsModule } from 'src/transports/nats.module';
import { ModuleController } from './exam-module.controller';

@Module({
  imports: [NatsModule],
  controllers: [ExamController, ModuleController],
  providers: [],
})
export class ExamModule {}
