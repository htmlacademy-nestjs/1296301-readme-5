import { Module } from '@nestjs/common';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [FeedModule],
  controllers: [],
  providers: [],
})
export class UserFeedModule {}
