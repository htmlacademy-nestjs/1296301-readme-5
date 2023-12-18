import { LinkPost } from './link-post.interface';
import { PhotoPost } from './photo-post.interface';
import { QuotePost } from './quote-post.interface';
import { TextPost } from './text-post.interface';
import { VideoPost } from './video-post.interface';

export type PostContentType = LinkPost | PhotoPost | QuotePost | TextPost | VideoPost
