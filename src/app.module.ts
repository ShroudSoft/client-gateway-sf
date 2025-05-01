import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExamModule } from './exam/exam.module';
import { BusinessModule } from './business/business.module';
import { BusinessUserModule } from './business-user/business-user.module';
import { ModuleModule } from './module/module.module';
import { QuestionModule } from './question/question.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    BusinessModule,
    BusinessUserModule,
    ExamModule,
    ModuleModule,
    QuestionModule,
  ],
})
export class AppModule {}
