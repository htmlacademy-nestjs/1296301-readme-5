import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigAccountModule, getMongooseOptions } from '@project/shared/config/account';

import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    ConfigAccountModule,
    NotificationsModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
  exports: [BlogUserModule],
})
export class AccountModule {}
