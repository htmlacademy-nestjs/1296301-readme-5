import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { getJwtOptions } from '@project/shared/config/account';

import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory: getJwtOptions,
      inject: [ConfigService],
    }),
    NotificationsModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthenticationModule {}
