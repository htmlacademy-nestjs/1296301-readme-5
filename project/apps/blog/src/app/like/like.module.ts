import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaClientModule } from '@project/shared/blog/models';
import { getJwtOptions, JwtAccessStrategy } from '@project/shared/helpers';
import { CheckAuthGuard } from '../guards/check-auth.guard';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { HttpClientParam } from '../post/constants/post.constant';

@Module({
  imports: [
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, JwtAccessStrategy, CheckAuthGuard],
  exports: [LikeRepository],
})
export class LikeModule {}
