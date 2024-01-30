import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Get, Body, Controller, Param, Post, Delete, Patch, Query, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';
import { RequestWithTokenPayload } from '@project/shared/app/types';
import { CreatePostDto, UpdatePostDto, PostQuery, SearchQuery } from '@project/shared/blog/dto';

import { PostService } from './post.service';
import { PostMessages, PostsError } from './constants/post.constant';

import { CreatePostValidationPipe } from './pipes/create-post-validation.pipe';
import { UpdatePostValidationPipe } from './pipes/update-post-validation.pipe';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { PostTypeRdo } from './rdo/post.rdo';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';
import { NotificationsService } from '../notifications/notifications.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  private readonly notificationsService: NotificationsService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Show,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);

    return fillDto(PostTypeRdo[post.type], post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.ShowAll,
  })
  @Get('/')
  public async index(@Query() query: PostQuery) {
    const postsWithPagination = await this.postService.getAllPostsByQuery(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };

    return fillDto(PostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.ShowUserPostCount,
  })
  @Get('user-posts-count/:id')
  public async getUserPosts(@Param('id') id: string) {
    return await this.postService.getUserPostsCount(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Search,
  })
  @Get('search')
  async search(@Query() query: SearchQuery) {
    const posts = await this.postService.getPostsBySearch(query);

    return posts.map((post) => fillDto(PostTypeRdo[post.type], post.toPOJO));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.ShowAllUserDrafts,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostsError.EmptyList,
  })
  @UseGuards(CheckAuthGuard)
  @Get('drafts')
  async showDrafts(@Req() { user }: RequestWithTokenPayload) {
    const posts = await this.postService.getUnpublishedPosts(user.sub);

    return posts.map((post) => fillDto(PostTypeRdo[post.type], post.toPOJO));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Add,
  })
  @Post('add')
  public async create(@Body(CreatePostValidationPipe) dto: CreatePostDto) {
    const post = await this.postService.createPost(dto);

    return fillDto(PostTypeRdo[post.type], post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Repost,
  })
  @UseGuards(CheckAuthGuard)
  @Post('/repost/:id')
  public async repost(
    @Req() { user }: RequestWithTokenPayload,
    @Param('id') id: string,
  ) {
    const post = await this.postService.repost(id, user.sub);

    return fillDto(PostTypeRdo[post.type], post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Update,
  })
  @UseGuards(CheckAuthGuard)
  @Patch(':id')
  public async update(
    @Req() { user }: RequestWithTokenPayload,
    @Param('id') id: string,
    @Body(UpdatePostValidationPipe) dto: UpdatePostDto,
  ) {
    const updatedPost = await this.postService.updatePost(id, dto, user.sub);

    return fillDto(PostTypeRdo[updatedPost.type], updatedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostMessages.Remove,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @Delete(':id')
  public async destroy(
    @Req() { user }: RequestWithTokenPayload,
    @Param('id') id: string,
  ) {
    return await this.postService.deletePost(id, user.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.SendNews
  })
  @UseGuards(CheckAuthGuard)
  @Get('news')
  public async sendNews(@Req() { user }: RequestWithTokenPayload) {
    const { email, sub } = user;
    const posts = await this.postService.getPosts();

    await this.notificationsService.sendNews({ email, posts, id: sub });
  }
}
