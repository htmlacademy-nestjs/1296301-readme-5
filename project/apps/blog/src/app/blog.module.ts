import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [PostModule, PublicationModule],
  controllers: [],
  providers: [],
  exports: []
})
export class BlogModule {}
