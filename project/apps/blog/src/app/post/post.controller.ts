import { Body, Req, Controller, Param, Post, Delete, Patch } from '@nestjs/common';
import { RequestWithUserPayload } from '@project/shared/app/types';
import { PostService } from './post.service';
import { PostPath } from './constants/post.constant';
import { ContentPostDto } from './dto/content-dto.type';
import { adaptRdoPost } from './utils/adapt-rdo-post.util';

@Controller(PostPath.Main)
export class PostController {
  constructor(
    private readonly postsService: PostService
  ) { }

  @Post(PostPath.Add)
  public async create(
    @Req() { user }: RequestWithUserPayload,
    @Body() dto: ContentPostDto) {
    const userId = user.id;
    const post = await this.postsService.create(dto, userId);

    return adaptRdoPost(post);
  }

  @Patch(PostPath.Id)
  public async update(
    @Req() { user }: RequestWithUserPayload,
    @Param('id') id: string,
    @Body() dto: ContentPostDto,
  ) {
    const userId = user.id;
    const post = await this.postsService.update(id, dto, userId);

    return adaptRdoPost(post);
  }

  @Post(PostPath.Repost)
  public async repost(
    @Param('id') id: string,
    @Req() { user }: RequestWithUserPayload,
  ) {
    const userId = user.id;
    const post = await this.postsService.repost(id, userId);

    return adaptRdoPost(post);
  }

  @Delete(PostPath.Id)
  public async delete(
    @Param('id') id: string,
    @Req() { user }: RequestWithUserPayload
  ) {
    const userId = user.id;

    return await this.postsService.remove(id, userId);
  }
}
