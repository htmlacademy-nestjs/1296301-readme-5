import { Post } from './post.interface';

export interface VideoPost extends Post {
  title: string;
  link: string;
}
