import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/shared/blog/models';
import { Like } from '@project/shared/app/types';
import { BasePostgresRepository } from '@project/shared/core';

import { LikeEntity } from './like.entity';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like>  {
  constructor(protected readonly client: PrismaClientService) {
    super(client, LikeEntity.fromObject);
  }

  public async create(entity: LikeEntity): Promise<LikeEntity> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.like.create({
      data: { ...pojoEntity },
    });

    entity.id = record.id;

    return entity;
  }

  public async find(postId: string, userId: string): Promise<LikeEntity> {
    const record = await this.client.like.findFirst({
      where: {
        postId,
        userId
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async findByPostId(postId: string): Promise<LikeEntity[]> {
    const likes = await this.client.like.findMany({
      where: {
        postId,
      },
    });

    return likes.map((like) => this.createEntityFromDocument(like));
  }

  public async delete(id: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }
}
