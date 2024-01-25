import { PostType } from '@project/shared/app/types';

import { PhotoPostRdo } from './photo-post.rdo';
import { VideoPostRdo } from './video-post.rdo';
import { TextPostRdo } from './text-post.rdo';
import { LinkPostRdo } from './link-post.rdo';
import { QuotePostRdo } from './quote-post.rdo';

export type PostRdo = PhotoPostRdo | VideoPostRdo | TextPostRdo | LinkPostRdo | QuotePostRdo;

export const PostTypeRdo = {
  [PostType.Video]: VideoPostRdo,
  [PostType.Text]: TextPostRdo,
  [PostType.Link]: LinkPostRdo,
  [PostType.Photo]: PhotoPostRdo,
  [PostType.Quote]: QuotePostRdo,
};
