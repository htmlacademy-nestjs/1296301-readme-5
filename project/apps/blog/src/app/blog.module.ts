import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PublicationModule } from './publication/publication.module';
import { MessageModule } from "./message/message.module";

@Module({
  imports: [PostModule, PublicationModule, MessageModule],
  controllers: [],
  providers: [],
  exports: []
})
export class BlogModule {}
