import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [QuestionController],
})
export class QuestionModule {}
