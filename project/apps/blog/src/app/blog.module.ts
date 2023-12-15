import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PublicationModule } from './publication/publication.module';
import { PostRepositoryModule } from './post-repository/post-repository.module';

@Module({
  imports: [PostModule, PostRepositoryModule, PublicationModule],
  controllers: [],
  providers: [],
  exports: [PostRepositoryModule]
})
export class BlogModule {}
