import { Post } from '@project/shared/app/types';
import { Entity } from "@project/shared/app/types";
import { Message } from '@project/shared/app/types';
import { PostType } from '@project/shared/app/types';
import { PublicationStatus } from '@project/shared/app/types';
import { DEFAULT_AMOUNT, DEFAULT_STATUS } from '../constants/post.constant';

export abstract class PostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public userId: string;
  public originalUserId?: string;
  public originalPostId?: string;
  public type: PostType;
  public createdAt?: Date;
  public publicatedAt?: Date;
  public status: PublicationStatus;
  public isRepost: boolean;
  public tags?: string[];
  public likesCount: number;
  public messagesCount: number;
  public messages: Message[];

  public populate(data: Post): PostEntity {
    this.id = data.id ?? undefined;
    this.userId = data.userId;
    this.originalUserId = data.originalUserId ?? undefined;
    this.originalPostId = data.originalPostId ?? undefined;
    this.type = data.type;
    this.createdAt = data.createdAt ?? undefined;
    this.publicatedAt = data.publicatedAt ?? undefined;
    this.status = data.status;
    this.isRepost = data.isRepost ?? DEFAULT_STATUS;
    this.likesCount = data.likesCount ?? DEFAULT_AMOUNT;
    this.messagesCount = data.messagesCount ?? DEFAULT_AMOUNT;
    this.tags = data.tags ?? [];
    this.messages = [];

    return this;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      userId: this.userId,
      originalUserId: this.originalUserId,
      originalPostId: this.originalPostId,
      type: this.type,
      createdAt: this.createdAt,
      publicatedAt: this.publicatedAt,
      status: this.status,
      isRepost: this.isRepost,
      likesCount: this.likesCount,
      messagesCount: this.messagesCount,
      tags: this.tags,
      messages: [],
    };
  }
}
