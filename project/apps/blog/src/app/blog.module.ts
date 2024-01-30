import { Module } from '@nestjs/common';

import { ConfigBlogModule } from '@project/shared/config/blog';

import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { MessageModule } from './message/message.module';
import { BlogNotifyModule } from './notifications/notifications.module';

@Module({
  imports: [
    PostModule,
    MessageModule,
    LikeModule,
    ConfigBlogModule,
    BlogNotifyModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class BlogModule {}
