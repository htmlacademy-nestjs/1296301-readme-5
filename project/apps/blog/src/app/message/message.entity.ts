import { Message, Entity } from '@project/shared/app/types';

export class MessageEntity implements Message, Entity<string, Message> {
  public id?: string;
  public postId: string;
  public message: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  public populate(data: Message): MessageEntity {
    this.id = data.id;
    this.message = data.message;
    this.postId = data.postId;
    this.userId = data.userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return this;
  }

  public toPOJO(): Message {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      message: this.message,
      userId: this.userId
    };
  }

  static fromObject(data: Message): MessageEntity {
    return new MessageEntity()
      .populate(data);
  }
}
