import { Injectable, ConflictException } from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageEntity } from './message.entity';
import { MessageRepository } from './message.repository';
import { MessageQuery } from './query/message.query';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
  ) {}

  public async createMessage(dto: CreateMessageDto, userId: string): Promise<MessageEntity> {
    const newComment = new MessageEntity({ ...dto, userId });

    return this.messageRepository.save(newComment);
  }

  async getMessage(id: string): Promise<MessageEntity> {
    const record = await this.messageRepository.findById(id);

    return new MessageEntity(record);
  }

  public async getMessages(query: MessageQuery): Promise<MessageEntity[]> {
    const records = await this.messageRepository.findByPostId(query);

    return records.map((message) => new MessageEntity(message));
  }

  async deleteMessage(id: string, userId: string): Promise<void> {
    const existMessage = await this.getMessage(id);

    if (existMessage.userId !== userId) {
      throw new ConflictException(`The user with ID ${userId} does not have a message with ID ${id}.`);
    }

    await this.messageRepository.delete(id);
  }

  async updateMessage(id: string, dto: UpdateMessageDto, userId: string): Promise<MessageEntity> {
    const existMessage = await this.getMessage(id);

    if (existMessage.userId !== userId) {
      throw new ConflictException(`The user with ID ${userId} cannot modify the post with with ID ${id}.`);
    }

    const updatedMessageRecord = await this.messageRepository.update(id, existMessage);

    return new MessageEntity(updatedMessageRecord);
  }
}
