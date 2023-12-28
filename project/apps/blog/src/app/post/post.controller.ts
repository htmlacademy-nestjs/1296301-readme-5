import { Body, Controller, Param, Post, Delete, Patch, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { PostPath, PostMessages, PostsError, API_TAG_NAME } from './constants/post.constant';
import { ContentPostDto } from './dto/content-dto.type';
import { adaptRdoPost } from './utils/adapt-rdo-post.util';
import { CreateLinkPostDto } from './dto/link-post.dto';
import { CreatePhotoPostDto } from './dto/photo-post.dto';
import { CreateVideoPostDto } from './dto/video-post.dto';
import { CreateQuotePostDto } from './dto/quote-post.dto';
import { CreateTextPostDto } from './dto/text-post.dto';
import { PostRdo } from './rdo/post.rdo';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(API_TAG_NAME)
@ApiExtraModels(CreateLinkPostDto, CreatePhotoPostDto, CreateQuotePostDto,
  CreateTextPostDto,CreateVideoPostDto)
@Controller(PostPath.Main)
export class PostController {
  constructor(
    private readonly postsService: PostService
  ) { }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostMessages.Add,
  })
  @Post(PostPath.Add)
  public async create(
    @Body() dto: ContentPostDto) {
    const post = await this.postsService.create(dto);

    return adaptRdoPost(post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostMessages.Update,
  })
  @Patch(PostPath.Id)
  public async update(
    @Param('id') id: string,
    @Body() dto: ContentPostDto,
  ) {
    const post = await this.postsService.update(id, dto);

    return adaptRdoPost(post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostMessages.Update,
  })
  @Post(PostPath.Repost)
  public async repost(
    @Param('id') id: string,
  ) {
    const post = await this.postsService.repost(id);

    return adaptRdoPost(post);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PostsError.Delete
  })
  @Delete(PostPath.Id)
  public async delete(
    @Param('id') id: string,
  ) {
    return await this.postsService.remove(id);
  }
}
