import { Post } from '@project/shared/app/types';
import { PostType } from '@project/shared/app/types';
import { PublicationStatus } from '@project/shared/app/types';
import { DEFAULT_AMOUNT, DEFAULT_STATUS } from '../constants/post.constant';

export abstract class PostEntity implements Post {
  public id?: string;
  public authorId?: string;
  public originalAuthorId?: string;
  public originalId?: string;
  public type: PostType;
  public creationDate: string;
  public publicationDate: string;
  public status: PublicationStatus;
  public isRepost: boolean;
  public tags: string[];
  public likesCount: number;
  public messagesCount: number;

  constructor(postData: Post) {
    this.id = postData.id;
    this.authorId = postData.authorId;
    this.originalAuthorId = postData.originalAuthorId;
    this.originalId = postData.originalId;
    this.type = postData.type;
    this.creationDate = postData.creationDate;
    this.publicationDate = postData.publicationDate;
    this.status = postData.status;
    this.isRepost = postData.isRepost || DEFAULT_STATUS;
    this.tags = postData.tags;
    this.likesCount = postData.likesCount || DEFAULT_AMOUNT;
    this.messagesCount = postData.messagesCount || DEFAULT_AMOUNT;
  }

  public toObject() {
    return {...this};
  }
}
