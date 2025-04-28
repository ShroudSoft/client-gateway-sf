import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BusinessModule } from './business/business.module';
@Module({
  imports: [AuthModule, UserModule, BusinessModule],
})
export class AppModule {}
