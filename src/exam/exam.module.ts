import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ExamController],
  providers: [],
})
export class ExamModule {}
