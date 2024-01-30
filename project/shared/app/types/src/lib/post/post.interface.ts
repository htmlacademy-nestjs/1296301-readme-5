import { PostType, PostTypeValues } from './enum/post-type.enum';
import { PublicationStatus, PublicationStatusValues } from './enum/publication-status.enum';
import { Message } from '../message/message.interface';
import { Like } from '../like/like.interface';

export interface Post {
  id?: string;
  originalPostId?: string;
  userId?: string;
  originalUserId?: string;
  type: PostTypeValues;
  createdAt?: Date;
  publicatedAt?: Date;
  status: PublicationStatusValues;
  isRepost: boolean;
  tags?: string[];
  likesCount?: number;
  messagesCount?: number;
  messages?: Message[];
  likes?: Like[];
}
