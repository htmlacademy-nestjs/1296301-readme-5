import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { AccountModule } from '../../../../account/src/app/account.module';
import { BlogModule } from '../../../../blog/src/app/blog.module';

@Module({
  imports: [
    AccountModule,
    BlogModule,
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
