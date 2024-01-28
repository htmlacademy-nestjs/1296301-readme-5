import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClient } from '../../../../../node_modules/.prisma/client';

import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/blog/models';
import { PostQuery, SearchQuery } from '@project/shared/blog/dto';
import { PublicationStatus, PaginationResult, PostContentType, SortBy, EntityIdType } from '@project/shared/app/types';

import { PostContentEntity } from './post-entity/post-content-entity.type';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostContentEntity, EntityIdType, PostContentType> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client);
  }

  public async getPostCount(where: PrismaClient.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private static calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: PostContentEntity): Promise<PostContentType> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        messages: {
          connect: [],
        },
        include: {
          messages: true,
          likes: true
        },
      },
    });

    entity.id = record.id;

    return record;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      },
      include: {
        messages: true,
        likes: true,
      },
    });
  }

  public async findById(id: string): Promise<PostContentType> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        messages: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id:${id} not found.`);
    }

    document.messagesCount = document._count.messages;
    document.likesCount = document._count.likes;

    delete document._count;

    return document;
  }

  public search({ title, limit }: SearchQuery): Promise<PostContentType[]> {
    const records = this.client.post.findMany({
      where: {
        title: {
          contains: title
        },
      },
      take: limit,
      include: {
        messages: true,
      },
      select: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    return records.map(({ _count, ...record }) => ({ ...record, likesCount: _count.likes, messages: _count.messages }));
  }

  public findUnpublishedPosts(userId: string): Promise<PostContentType[]> {
    const records = this.client.post.findMany({
      where: {
        userId,
        status: PublicationStatus.Draft,
      },
      include: {
        messages: true,
      },
      select: {
        _count: {
          select: {
            messages: true,
            likes: true
          },
        },
      },
    });

    return records.map((record) => {
      record.messagesCount = record._count.messages;
      record.likesCount = record._count.likes;

      delete record._count;

      return record;
    });
  }

  public async update(id: string, entity: PostContentEntity): Promise<PostContentType> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.update({
      where: { id },
      data: { ...pojoEntity },
      include: {
        messages: true,
        likes: true,
      },
      select: {
        _count: {
          select: {
            messages: true,
            likes: true
          },
        },
      },
    });

    record.messagesCount = record._count.messages;
    record.likesCount = record._count.likes;

    delete record._count;

    return record;
  }

  public async find(query?: PostQuery): Promise<PaginationResult<PostContentType>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const orderBy = query.sortBy !== SortBy.CreatedAt
      ? { [query.sortBy]: { _count: query.sortDirection } }
      : { [query.sortBy]: query.sortDirection };

    const where: PrismaClient.PostWhereInput = {
      status: PublicationStatus.Published,
    };

    if (query?.type) {
      where.type = query.type;
    }

    if (query?.tag) {
      where.tags = {
        has: query.tag,
      }
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          messages: true,
        },
        select: {
          _count: {
            select: {
              messages: true,
              likes: true
            },
          },
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => {
        record.messagesCount = record._count.messages;
        record.likesCount = record._count.likes;

        delete record._count;

        return record;
      }),
      currentPage: query?.page,
      totalPages: PostRepository.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async getFullList(): Promise<PostContentType[]> {
    return await this.client.post.findMany({
      where: {
        status: PublicationStatus.Published,
      },
      include: {
        messages: true,
        likes: true,
      },
    });
  }
}
