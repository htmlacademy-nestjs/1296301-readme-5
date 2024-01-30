import { PostType } from '@project/shared/app/types';
import { PostContentEntity } from './post-content-entity.type';
import { PostContentType } from '@project/shared/app/types';

import { VideoPostEntity } from './video-post.entity';
import { LinkPostEntity } from './link-post.entity';
import { PhotoPostEntity } from './photo-post.entity';
import { QuotePostEntity } from './quote-post.entity';
import { TextPostEntity } from './text-post.entity';

export const PostTypeEntity = {
  [PostType.link]: LinkPostEntity,
  [PostType.photo]: PhotoPostEntity,
  [PostType.quote]: QuotePostEntity,
  [PostType.text]: TextPostEntity,
  [PostType.video]: VideoPostEntity
}

export function postTypeEntityAdapter (document: PostContentType): PostContentEntity {
  return new PostTypeEntity[document.type](document);
}
