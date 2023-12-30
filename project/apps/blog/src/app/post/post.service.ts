import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../post-repository/post-repository';
import { DEFAULT_AMOUNT, PostsError } from './constants/post.constant';
import { ContentPostDto } from './dto/content-dto.type';
import { PostTypeEntity } from './post-entity/post-type.entity';
import { PublicationStatus } from '@project/shared/app/types';
import { getDate } from '@project/shared/helpers';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) { }

  public async create(dto: ContentPostDto) {
    const post = {
      ...dto,
      status: PublicationStatus.Published,
      likesCount: DEFAULT_AMOUNT,
      messagesCount: DEFAULT_AMOUNT,
      isRepost: false,
    };
    const postEntity = await new PostTypeEntity[post.type](post);

    return this.postRepository.save(postEntity);
  }

  public async update(postId: string, dto: ContentPostDto) {
    const post = await this.findByPostId(postId);

    if (dto.userId !== post.userId) {
      throw new BadRequestException(PostsError.NotUserAuthor)
    }

    const updatedPost = { ...post, ...dto, publicationDate: getDate() }
    const postEntity = await new PostTypeEntity[updatedPost.type](updatedPost);

    return this.postRepository.update(postId, postEntity);
  }

  public async findByPostId(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(PostsError.PostNotFound);
    }

    return post;
  }

  public async repost(id: string) {
    const originalPost = await this.findByPostId(id);

    if (originalPost.isRepost) {
      throw new BadRequestException(PostsError.AlreadyReposted)
    }

    const post = {
      ...originalPost as ContentPostDto,
      isRepost: true,
      originalUserId: originalPost.userId,
      originalPostId: originalPost.id,
      publicationDate: getDate(),
      likesCount: DEFAULT_AMOUNT,
      messagesCount: DEFAULT_AMOUNT,
    };
    const postEntity = await new PostTypeEntity[post.type](post);

    return this.postRepository.save(postEntity);
  }

  public async remove(postId: string) {
    return this.postRepository.delete(postId);
  }
}
