import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PostContentType, PaginationResult } from "@project/shared/app/types";

import { PostRepository } from './post.repository';
import { PostsError } from './constants/post.constant';

import { PostTypeEntity } from './post-entity/post-type.entity';
import { PostContentEntity } from './post-entity/post-content-entity.type';
import { PostQuery } from './query/post.query';
import { SearchQuery } from './query/search.query';
import { CreatePostDto } from './dto/create-post/create-post.dto';
import { UpdatePostDto } from './dto/update-post/update-post.dto';

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

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<PostContentEntity> {
    const record = await this.postRepository.findById(id);

    return new PostTypeEntity[record.type];
  }

  public async getAllPosts(query?: PostQuery): Promise<PaginationResult<PostContentEntity>> {
    const { entities, ...params } = await this.postRepository.find(query);

    return {
      entities: entities.map((document: PostContentType): PostContentEntity => {
        return new PostTypeEntity[document.type](document);
      }),
      ...params,
    };
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostContentEntity> {
    const existsPost = await this.postRepository.findById(id);
    const existsPostEntity = new PostTypeEntity[existsPost.type](existsPost);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'categories' && existsPostEntity[key] !== value) {
        existsPostEntity[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsPostEntity;
    }

    return this.postRepository.update(id, existsPostEntity);
  }

  public async repost(id: string, userId: string) {
    const originalPost = await this.postRepository.findById(id);
    const originalPostEntity = new PostTypeEntity[originalPost.type](originalPost);

    if (originalPostEntity.isRepost) {
      throw new BadRequestException(PostsError.AlreadyReposted)
    }

    originalPostEntity.userId = userId;
    originalPostEntity.isRepost = true;
    originalPostEntity.originalPostId = originalPost.id;
    originalPostEntity.originalUserId = originalPost.userId;

    await this.postRepository.save(originalPostEntity);

    return originalPostEntity;
  }

  async getUnpublishedPosts(userId: string): Promise<PostContentEntity[]> {
    const posts = await this.postRepository.findUnpublishedPosts(userId);

    return posts.map((post) => new PostTypeEntity[post.type](post));
  }

  async getPostsBySearch(search: SearchQuery): Promise<PostContentEntity[]> {
    const posts = await this.postRepository.search(search);

    return posts.map((post) => new PostTypeEntity[post.type](post));
  }
}
