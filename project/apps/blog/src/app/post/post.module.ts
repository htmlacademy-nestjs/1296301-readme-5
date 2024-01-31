import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { PrismaClientModule } from '@project/shared/blog/models';
import { getJwtOptions, JwtAccessStrategy, CheckAuthGuard } from '@project/shared/helpers';

import { HttpClientParam } from './constants/post.constant';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

import { BlogNotifyModule } from '../notifications/notifications.module';

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
    BlogNotifyModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, JwtAccessStrategy, CheckAuthGuard],
  exports: [PostService],
})
export class PostModule {}
