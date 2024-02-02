import { Injectable, ConflictException } from '@nestjs/common';

import { CreateMessageDto, UpdateMessageDto, MessageQuery } from '@project/shared/blog/dto';

import { MessageEntity } from './message.entity';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
  ) {}

  public async createMessage(dto: CreateMessageDto, userId: string): Promise<MessageEntity> {
    const newMessage = new MessageEntity().populate({ ...dto, userId });

    return await this.messageRepository.save(newMessage);
  }

  async getMessage(id: string): Promise<MessageEntity> {
    return await this.messageRepository.findById(id);
  }

  public async getMessages(query: MessageQuery): Promise<MessageEntity[]> {
    return await this.messageRepository.findByPost(query);
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

    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existMessage[key] !== value) {
        existMessage[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existMessage;
    }

    return await this.messageRepository.update(id, existMessage);
  }
}
