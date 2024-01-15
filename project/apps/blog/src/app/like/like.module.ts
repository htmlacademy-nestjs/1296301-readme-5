import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/blog/models';

import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';

@Module({
  imports: [PrismaClientModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
  exports: [LikeRepository],
})
export class LikeModule {}
