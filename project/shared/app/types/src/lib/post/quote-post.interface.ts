import { Post } from './post.interface';

export interface QuotePost extends Post {
  description: string;
  quoteAuthor: string;
}
