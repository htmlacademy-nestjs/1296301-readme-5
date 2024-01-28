import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaClientModule } from '@project/shared/blog/models';
import { getJwtOptions, JwtAccessStrategy } from '@project/shared/helpers';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    PrismaClientModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, JwtAccessStrategy],
  exports: [PostService],
})
export class PostModule {}
