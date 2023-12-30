import { PostContentType } from '@project/shared/app/types';
import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { PublicationStatus } from '@project/shared/app/types';
import { PostContentEntity } from '../post/post-entity/post-content-entity.type';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostContentEntity> {
  public async getFullList(): Promise<PostContentType[]> {
    const entities = Array.from(this.entities.values());
    const list = entities.filter((entity) => entity.status === PublicationStatus.Published);

    return Promise.resolve(list);
  }

  public async searchByUserId(userId: string): Promise<PostContentType[]> {
    const entities = Array.from(this.entities.values());
    const list = entities.filter((entity) => entity.userId === userId);

    return Promise.resolve(list);
  }
}
