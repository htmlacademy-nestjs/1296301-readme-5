import { Body, Controller, Param, Post, Delete, Patch } from '@nestjs/common';
import { PostService } from './post.service';
import { PostPath, API_TAG_NAME } from './constants/post.constant';
import { CreatePostDto } from './dto/create-post/create-post.dto';
import { adaptRdoPost } from './utils/adapt-rdo-post.util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(API_TAG_NAME)
@Controller(PostPath.Main)
export class PostController {
  constructor(
    private readonly postsService: PostService
  ) { }

  @Post(PostPath.Add)
  public async create(
    @Body() dto: CreatePostDto) {
    const post = await this.postsService.create(dto);

    return adaptRdoPost(post);
  }

  @Patch(PostPath.Id)
  public async update(
    @Param('id') id: string,
    @Body() dto: CreatePostDto,
  ) {
    const post = await this.postsService.update(id, dto);

    return adaptRdoPost(post);
  }

  @Post(PostPath.Repost)
  public async repost(
    @Param('id') id: string,
  ) {
    const post = await this.postsService.repost(id);

    return adaptRdoPost(post);
  }

  @Delete(PostPath.Id)
  public async delete(
    @Param('id') id: string,
  ) {
    return await this.postsService.remove(id);
  }
}
