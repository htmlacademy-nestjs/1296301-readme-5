import { PostType } from '@project/shared/app/types';

import { PhotoPostRdo } from './photo-post.rdo';
import { VideoPostRdo } from './video-post.rdo';
import { TextPostRdo } from './text-post.rdo';
import { LinkPostRdo } from './link-post.rdo';
import { QuotePostRdo } from './quote-post.rdo';

export type PostRdo = PhotoPostRdo | VideoPostRdo | TextPostRdo | LinkPostRdo | QuotePostRdo;

export const PostTypeRdo = {
  [PostType.video]: VideoPostRdo,
  [PostType.text]: TextPostRdo,
  [PostType.link]: LinkPostRdo,
  [PostType.photo]: PhotoPostRdo,
  [PostType.quote]: QuotePostRdo,
};
