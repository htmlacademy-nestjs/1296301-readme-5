import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [BlogUserModule, AuthenticationModule],
  controllers: [],
  providers: [],
  exports: [BlogUserModule],
})
export class AccountModule {}
