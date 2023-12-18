import { adaptRdoPost } from '../../../../blog/src/app/post/utils/adapt-rdo-post.util';
import { Controller, Get, Req, HttpStatus } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedPath, API_TAG_NAME, FeedMessages, FeedError } from './feed.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(API_TAG_NAME)
@Controller(FeedPath.Main)
export class FeedController {
  constructor(
    private readonly feedService: FeedService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FeedError.EmptyList
  })
  @Get()
  public async show(@Req() {user}) {
    const posts = await this.feedService.findFeed(user.id);

    return posts.map((post) => adaptRdoPost(post) );
  }
}
