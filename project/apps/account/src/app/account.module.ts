import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigAccountModule } from '@project/shared/config/account';

@Module({
  imports: [BlogUserModule, AuthenticationModule, ConfigAccountModule],
  controllers: [],
  providers: [],
  exports: [BlogUserModule],
})
export class AccountModule {}
