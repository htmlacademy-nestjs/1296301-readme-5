import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { getJwtOptions, JwtAccessStrategy } from '@project/shared/helpers';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory: getJwtOptions,
      inject: [ConfigService],
    }),
    NotificationsModule,
    RefreshTokenModule,
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
