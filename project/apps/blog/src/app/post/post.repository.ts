import { Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository } from "@project/shared/core";
import { PrismaClientService } from "@project/shared/blog/models";
import { PostQuery } from "./query/post.query";
import { SearchQuery } from "./query/search.query";
import { PublicationStatus, PaginationResult, SortBy } from "@project/shared/app/types";
import { PostContentEntity } from "./post-entity/post-content-entity.type";
import { PostContentType } from "@project/shared/app/types";
import { PrismaClient } from '../../../../../node_modules/.prisma/client'
import { EntityIdType } from "@project/shared/app/types";


@Injectable()
export class PostRepository extends BasePostgresRepository<PostContentEntity, EntityIdType, PostContentType> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client);
  }

  private async getPostCount(where: PrismaClient.PostWhereInput): Promise<number> {
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
    });
  }

  public async findById(id: string): Promise<PostContentType> {
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

    return document;
  }

  public search({ title, limit }: SearchQuery): Promise<PostContentType[]> {
    return this.client.post.findMany({
      where: {
        title: {
          contains: title
        },
      },
      take: limit,
      include: {
        messages: true,
        likes: true
      }
    });
  }

  public findUnpublishedPosts(userId: string): Promise<PostContentType[]> {
    return this.client.post.findMany({
      where: {
        userId,
        status: PublicationStatus.Draft,
      },
      include: {
        messages: true,
        likes: true,
      },
    });
  }

  public async update(id: string, entity: PostContentEntity): Promise<PostContentType> {
    const pojoEntity = entity.toPOJO();

    return await this.client.post.update({
      where: { id },
      data: { ...pojoEntity },
      include: {
        messages: true,
        likes: true,
      }
    });
  }

  public async find(query?: PostQuery): Promise<PaginationResult<PostContentType>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const orderBy = query.sortBy !== SortBy.CreatedAt
      ? { [query.sortBy]: { _count: query.sortDirection } }
      : { [query.sortBy]: query.sortDirection };

    const where: PrismaClient.PostWhereInput = {
      userId: query.userId,
      type: query.type,
      status: PublicationStatus.Published,
      tags: { has: query.tag }
    };

    if (query?.tag) {
      where.tags = {
        has: query.tag,
      }
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          messages: true,
          likes: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records,
      currentPage: query?.page,
      totalPages: PostRepository.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }
}
