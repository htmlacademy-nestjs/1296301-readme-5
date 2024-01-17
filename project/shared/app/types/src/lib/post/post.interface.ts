import { PostType } from './enum/post-type.enum';
import { PublicationStatus } from './enum/publication-status.enum';
import { Message } from '../message/message.interface';

export interface Post {
  id?: string;
  originalPostId?: string;
  userId?: string;
  originalUserId?: string;
  type: PostType;
  createdAt?: Date;
  publicatedAt?: Date;
  status: PublicationStatus;
  isRepost: boolean;
  tags?: string[];
  likesCount: number;
  messagesCount: number;
  messages: Message[];
}
