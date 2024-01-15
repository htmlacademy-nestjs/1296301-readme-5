import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Get, Body, Controller, Param, Post, Delete, Patch, Query, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { PostService } from './post.service';
import { PostMessages } from './constants/post.constant';

import { PostQuery } from './query/post.query';
import { SearchQuery } from './query/search.query';
import { CreatePostDto } from './dto/create-post/create-post.dto';
import { UpdatePostDto } from './dto/update-post/update-post.dto';
import { CreateTypePostRdo } from './dto/update-post/update-post.dto';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Show,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);

    return fillDto(CreateTypePostRdo[post.type], post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.ShowAll,
  })
  @Get('/')
  public async index(@Query() query: PostQuery) {
    const postsWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };

    return fillDto(PostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Search,
  })
  @Get('search')
  async search(@Query() query: SearchQuery) {
    const posts = await this.postService.getPostsBySearch(query);

    return posts.map((post) => fillDto(CreateTypePostRdo[post.type], post));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Add,
  })
  @Post('add')
  public async create(
    @Body() dto: CreatePostDto) {
    const post = await this.postService.createPost(dto);

    return fillDto(CreateTypePostRdo[post.type], post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Repost,
  })
  @Post('/repost/:id')
  public async repost(
    @Param('id') id: string,
  ) {
    const post = await this.postService.repost(id, 'userId');

    return fillDto(CreateTypePostRdo[post.type], post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Update,
  })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ) {
    const updatedPost = await this.postService.updatePost(id, dto);

    return fillDto(CreateTypePostRdo[updatedPost.type], updatedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostMessages.Remove,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async destroy(
    @Param('id') id: string,
  ) {
    return await this.postService.deletePost(id);
  }
}
