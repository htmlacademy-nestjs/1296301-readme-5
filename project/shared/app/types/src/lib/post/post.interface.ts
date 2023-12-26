import { PostType } from './enum/post-type-enum';
import { PublicationStatus } from './enum/publication-status-enum';

export interface Post {
  id?: string;
  originalId?: string;
  authorId?: string;
  originalAuthorId?: string;
  type: PostType;
  createdAt: string;
  publicatedAt: string;
  status: PublicationStatus;
  isRepost: boolean;
  tags?: string[];
  likesCount: number;
  messagesCount: number;
}
