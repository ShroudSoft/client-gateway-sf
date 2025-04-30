import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExamModule } from './exam/exam.module';
@Module({
  imports: [AuthModule, UserModule, ExamModule],
})
export class AppModule {}
