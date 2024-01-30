import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/shared/app/types';
import { CreatePostDto, UpdatePostDto, PostQuery, SearchQuery } from '@project/shared/blog/dto';

import { PostRepository } from './post.repository';
import { PostsError } from './constants/post.constant';

import { PostTypeEntity } from './post-entity/post-type.entity';
import { PostContentEntity } from './post-entity/post-content-entity.type';


@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  public async createPost(dto: CreatePostDto): Promise<PostContentEntity> {
    const postType = dto.type;
    const newPost = new PostTypeEntity[postType](dto);

    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string, userId: string): Promise<void> {
    const deletingPost = await this.getPost(id);

    if (deletingPost?.userId === userId) {
      await this.postRepository.delete(id);
    } else {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<PostContentEntity> {
    return await this.postRepository.findById(id);
  }

  public async getUserPostsCount(id: string): Promise<number> {
    return await this.postRepository.getPostCount({ userId: id });
  }

  public async getAllPostsByQuery(query?: PostQuery): Promise<PaginationResult<PostContentEntity>> {
    return await this.postRepository.find(query);
  }

  public async updatePost(id: string, dto: UpdatePostDto, userId: string): Promise<PostContentEntity> {
    const existsPost = await this.postRepository.findById(id);

    if (existsPost?.userId !== userId) {
      throw new NotFoundException(`You can't update post with ID ${id}`);
    }

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'categories' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsPost;
    }

    return this.postRepository.update(id, existsPost);
  }

  public async repost(id: string, userId: string): Promise<PostContentEntity> {
    const originalPostEntity = await this.postRepository.findById(id);

    if (originalPostEntity.isRepost) {
      throw new BadRequestException(PostsError.AlreadyReposted)
    }

    originalPostEntity.userId = userId;
    originalPostEntity.isRepost = true;
    originalPostEntity.originalPostId = originalPostEntity.id;
    originalPostEntity.originalUserId = originalPostEntity.userId;

    await this.postRepository.save(originalPostEntity);

    return originalPostEntity;
  }

  async getUnpublishedPosts(userId: string): Promise<PostContentEntity[]> {
    return await this.postRepository.findUnpublishedPosts(userId);
  }

  async getPostsBySearch(search: SearchQuery): Promise<PostContentEntity[]> {
    return await this.postRepository.search(search);
  }

  public async getPosts(): Promise<PostContentEntity[]> {
    return await this.postRepository.getFullList();
  }
}
