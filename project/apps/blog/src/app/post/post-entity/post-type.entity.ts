import { PostType } from '@project/shared/app/types';
import { VideoPostEntity } from './video-post.entity';
import { LinkPostEntity } from './link-post.entity';
import { PhotoPostEntity } from './photo-post.entity';
import { QuotePostEntity } from './quote-post.entity';
import { TextPostEntity } from './text-post.entity';

export const PostTypeEntity = {
  [PostType.Link]: LinkPostEntity,
  [PostType.Photo]: PhotoPostEntity,
  [PostType.Quote]: QuotePostEntity,
  [PostType.Text]: TextPostEntity,
  [PostType.Video]: VideoPostEntity
}
