import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExamModule } from './exam/exam.module';
import { BusinessModule } from './business/business.module';
import { BusinessUserModule } from './business-user/business-user.module';
@Module({
  imports: [AuthModule, UserModule, ExamModule, BusinessModule, BusinessUserModule],
})
export class AppModule {}
