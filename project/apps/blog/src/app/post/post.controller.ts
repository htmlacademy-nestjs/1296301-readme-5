import { Get, Body, Controller, Param, Post, Delete, Patch, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { PostPath, API_TAG_NAME } from './constants/post.constant';
import { CreatePostDto } from './dto/create-post/create-post.dto';
import { UpdatePostDto } from "./dto/update-post/update-post.dto";
import { fillDto } from "@project/shared/helpers";
import { ApiTags } from '@nestjs/swagger';
import { CreateTypePostRdo } from "./dto/update-post/update-post.dto";
import { PostQuery } from "./query/post.query";
import { SearchQuery } from "./query/search.query";
import { PostWithPaginationRdo } from "./rdo/post-with-pagination.rdo";

@ApiTags(API_TAG_NAME)
@Controller(PostPath.Main)
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);

    return fillDto(CreateTypePostRdo[post.type], post.toPOJO());
  }

  @Get('/')
  public async index(@Query() query: PostQuery) {
    const postsWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };

    return fillDto(PostWithPaginationRdo, result);
  }

  @Get('/search')
  async search(@Query() query: SearchQuery) {
    const posts = await this.postService.getPostsBySearch(query);

    return posts.map((post) => fillDto(CreateTypePostRdo[post.type], post));
  }

  @Post(PostPath.Add)
  public async create(
    @Body() dto: CreatePostDto) {
    const post = await this.postService.createPost(dto);

    return fillDto(CreateTypePostRdo[post.type], post.toPOJO());
  }

  @Post(PostPath.Repost)
  public async repost(
    @Param('id') id: string,
  ) {
    const post = await this.postService.repost(id);

    return fillDto(CreateTypePostRdo[post.type], post.toPOJO());
  }

  @Patch(PostPath.Id)
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ) {
    const updatedPost = await this.postService.updatePost(id, dto);

    return fillDto(CreateTypePostRdo[updatedPost.type], updatedPost.toPOJO());
  }

  @Delete(PostPath.Id)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(
    @Param('id') id: string,
  ) {
    return await this.postService.deletePost(id);
  }
}
