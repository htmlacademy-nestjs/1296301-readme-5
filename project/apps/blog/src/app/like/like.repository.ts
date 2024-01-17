import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/shared/blog/models';
import { EntityIdType, Like } from '@project/shared/app/types';
import { BasePostgresRepository } from '@project/shared/core';

import { LikeEntity } from './like.entity';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, EntityIdType, Like>  {
  constructor(private readonly client: PrismaClientService) {
    super(client);
  }

  public async create(item: LikeEntity): Promise<LikeEntity> {
    const record = await this.client.like.create({
      data: {
        ...item.toPOJO(),
      },
    });

    return new LikeEntity(record);
  }

  public async find(postId: string, userId: string): Promise<Like> {
    return await this.client.like.findFirst({
      where: {
        postId,
        userId
      }
    });
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    const likes = await this.client.like.findMany({
      where: {
        postId,
      },
    });

    return likes.map((like) => new LikeEntity(like));
  }

  public async delete(id: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }
}
