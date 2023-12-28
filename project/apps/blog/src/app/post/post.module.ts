import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepositoryModule } from '../post-repository/post-repository.module';
import { PrismaClientModule } from '@project/shared/blog/models';

@Module({
  imports: [PostRepositoryModule, PrismaClientModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
