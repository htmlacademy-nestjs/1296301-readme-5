import { Post, PostType, PostTypeValues, PublicationStatusValues, Entity, Message, Like, PublicationStatus } from '@project/shared/app/types';

import { DEFAULT_AMOUNT, DEFAULT_STATUS } from '../constants/post.constant';

export abstract class PostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public userId?: string;
  public originalUserId?: string;
  public originalPostId?: string;
  public type: PostTypeValues;
  public createdAt?: Date;
  public publicatedAt?: Date;
  public status: PublicationStatusValues;
  public isRepost: boolean;
  public tags?: string[];
  public likesCount?: number;
  public messagesCount?: number;
  public messages: Message[];
  public likes: Like[];

  protected constructor(data: Post) {
    this.id = data.id ?? undefined;
    this.userId = data.userId ?? undefined;
    this.originalUserId = data.originalUserId ?? undefined;
    this.originalPostId = data.originalPostId ?? undefined;
    this.type = data.type;
    this.createdAt = data.createdAt ?? undefined;
    this.publicatedAt = data.publicatedAt ?? undefined;
    this.status = data.status;
    this.isRepost = data.isRepost ?? DEFAULT_STATUS;
    this.likesCount = data.likesCount;
    this.messagesCount = data.messagesCount;
    this.tags = data.tags ?? [];
    this.messages = data.messages ?? [];
    this.likes = data.likes ?? [];
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
      messages: this.messages,
      likes: this.likes,
    };
  }
}
