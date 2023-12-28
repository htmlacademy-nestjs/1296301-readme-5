import { Post } from '@project/shared/app/types';
import { Tag } from '@project/shared/app/types';
import { Message } from '@project/shared/app/types';
import { Like } from '@project/shared/app/types';
import { PostType } from '@project/shared/app/types';
import { PublicationStatus } from '@project/shared/app/types';
import { DEFAULT_AMOUNT, DEFAULT_STATUS } from '../constants/post.constant';

export abstract class PostEntity implements Post {
  public id?: string;
  public userId?: string;
  public originalUserId?: string;
  public originalPostId?: string;
  public type: PostType;
  public createdAt: Date;
  public publicatedAt: Date;
  public status: PublicationStatus;
  public isRepost: boolean;
  public tags: Tag[];
  public likesCount: number;
  public messagesCount: number;
  public likes: Like[];
  public messages: Message[];

  protected constructor(postData: Post) {
    this.id = postData.id;
    this.userId = postData.userId;
    this.originalUserId = postData.originalUserId;
    this.originalPostId = postData.originalPostId;
    this.type = postData.type;
    this.createdAt = postData.createdAt;
    this.publicatedAt = postData.publicatedAt;
    this.status = postData.status;
    this.isRepost = postData.isRepost || DEFAULT_STATUS;
    this.tags = postData.tags;
    this.likesCount = postData.likesCount || DEFAULT_AMOUNT;
    this.messagesCount = postData.messagesCount || DEFAULT_AMOUNT;
    this.messages = postData.messages;
    this.likes = postData.likes
  }

  public toPOJO() {
    return {...this};
  }
}
