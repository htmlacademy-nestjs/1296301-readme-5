import { Message } from "@project/shared/app/types";
import { Entity } from "@project/shared/app/types";

export class MessageEntity implements Message, Entity<string, Message> {
  public id?: string;
  public postId?: string;
  public message: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(message: Message) {
    this.populate(message)
  }

  public populate(data: Message): MessageEntity {
    this.id = data.id ?? undefined;
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
}
