import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/blog/models';
import { PostQuery, SearchQuery } from '@project/shared/blog/dto';
import { PublicationStatus, PaginationResult, PostContentType, SortBy } from '@project/shared/app/types';

import { postTypeEntityAdapter } from './post-entity/post-type.entity';
import { PostContentEntity } from './post-entity/post-content-entity.type';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostContentEntity, PostContentType> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, postTypeEntityAdapter);
  }

  public async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private static calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: PostContentEntity): Promise<PostContentEntity> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        messages: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
      include: {
        messages: true,
        likes: true,
      },
    });

    entity.id = record.id;

    return entity;
  }

  public async delete(id: string): Promise<void> {
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

  public async findById(id: string): Promise<PostContentEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        messages: true,
        likes: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id:${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async search({ title, limit }: SearchQuery): Promise<PostContentEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        title: {
          contains: title
        },
      },
      take: limit,
      include: {
        messages: true,
        likes: true,
        _count: {
          select: {
            messages: true,
            likes: true
          },
        },
      },
    });

    return records.map(({ _count, ...record }) => this.createEntityFromDocument({ ...record, messagesCount: _count.messages, likesCount: _count.likes }));
  }

  public async findUnpublishedPosts(userId: string): Promise<PostContentEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        userId,
        status: PublicationStatus.Draft,
      },
      include: {
        messages: true,
        likes: true,
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async update(id: string, entity: PostContentEntity): Promise<PostContentEntity> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.update({
      where: { id },
      data: {
        ...pojoEntity,
        messages: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
      include: {
        messages: true,
        likes: true,
      },
    });

    return this.createEntityFromDocument(record);
  }

  public async find(query?: PostQuery): Promise<PaginationResult<PostContentEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const orderBy = query.sortBy !== SortBy.CreatedAt
      ? { [query.sortBy]: { _count: query.sortDirection } }
      : { [query.sortBy]: query.sortDirection };

    const where: Prisma.PostWhereInput = {
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
          likes: true,
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
      entities: records.map(({ _count, ...record }) => this.createEntityFromDocument({ ...record, messagesCount: _count.messages, likesCount: _count.likes })),
      currentPage: query?.page,
      totalPages: PostRepository.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async getFullList(): Promise<PostContentEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        status: PublicationStatus.Published,
      },
      include: {
        messages: true,
        likes: true,
        _count: {
          select: {
            messages: true,
            likes: true
          },
        },
      },
    });

    return records.map(({ _count, ...record }) => this.createEntityFromDocument({ ...record, messagesCount: _count.messages, likesCount: _count.likes }));
  }
}
