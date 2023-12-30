import { PostType } from './enum/post-type-enum';
import { PublicationStatus } from './enum/publication-status-enum';
import { Tag } from '../tag/tag.interface';
import { Message } from '../message/message.interface';
import { Like } from '../like/like.interface';

export interface Post {
  id?: string;
  originalPostId?: string;
  userId?: string;
  originalUserId?: string;
  type: PostType;
  createdAt: Date;
  publicatedAt: Date;
  status: PublicationStatus;
  isRepost: boolean;
  tags: Tag[];
  likesCount: number;
  messagesCount: number;
  likes: Like[];
  messages: Message[];
}
