import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/blog/models';
import { Message, EntityIdType } from '@project/shared/app/types';
import { MessageQuery } from '@project/shared/blog/dto';

import { MessageEntity } from './message.entity';

@Injectable()
export class MessageRepository extends BasePostgresRepository<MessageEntity, EntityIdType, Message> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client);
  }

  public async save(entity: MessageEntity): Promise<Message> {
    const record = await this.client.message.create({
      data: {
        message: entity.message,
        userId: entity.userId,
        postId: entity.postId,
      },
    });
    entity.id = record.id;

    return entity;
  }

  public async findById(id: string): Promise<Message> {
    const record = await this.client.message.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Message with id ${id} not found.`);
    }

    return record;
  }

  public async findByPost({ limit, postId, sortDirection, page }: MessageQuery): Promise<Message[]> {
    const records = await this.client.message.findMany({
      where: {
        postId,
      },
      take: limit,
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    if (!records || records.length === 0) {
      throw new NotFoundException(`Messages with postId ${postId} not found.`);
    }

    return records;
  }

  public async update(id: string, item: MessageEntity): Promise<Message> {
    return await this.client.message.update({
      where: {
        id
      },
      data: { ...item.toPOJO(), id }
    });
  }

  public async delete(id: string): Promise<void> {
    await this.client.message.delete({
      where: {
        id
      }
    });
  }
}
