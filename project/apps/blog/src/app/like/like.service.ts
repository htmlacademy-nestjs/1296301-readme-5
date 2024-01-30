import { BadRequestException, Injectable } from '@nestjs/common';

import { LikeError } from './constants/like.constants';
import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
  ) {}

  public async create(postId: string, userId: string): Promise<LikeEntity> {
    const like = await this.likeRepository.find(postId, userId);

    if (like) {
      throw new BadRequestException(LikeError.AlreadyExist)
    }

    const likeEntity = new LikeEntity().populate({ postId, userId })

    return await this.likeRepository.create(likeEntity);
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    return await this.likeRepository.findByPostId(postId);
  }

  public async deleteLike(postId: string, userId: string): Promise<void> {
    const like = await this.likeRepository.find(postId, userId);

    if (!like) {
      throw new BadRequestException(LikeError.NoExistLikeId);
    }

    if (like.userId !== userId) {
      throw new BadRequestException(LikeError.NoCorrespondingUser);
    }

    await this.likeRepository.delete(like.id);
  }
}
