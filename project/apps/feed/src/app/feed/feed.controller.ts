import { adaptRdoPost } from '../../../../blog/src/app/post/utils/adapt-rdo-post.util';
import { Controller, Get, Req } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedPath } from './feed.constant';

@Controller(FeedPath.Main)
export class FeedController {
  constructor(
    private readonly feedService: FeedService
  ) {}

  @Get()
  public async show(@Req() {user}) {
    const posts = await this.feedService.findFeed(user.id);

    return posts.map((post) => adaptRdoPost(post) );
  }
}
