import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaClientModule } from '@project/shared/blog/models';
import { getJwtOptions, JwtAccessStrategy } from '@project/shared/helpers';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';

@Module({
  imports: [
    PrismaClientModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, JwtAccessStrategy],
  exports: [LikeRepository],
})
export class LikeModule {}
