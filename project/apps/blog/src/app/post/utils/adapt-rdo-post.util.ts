import { PostContentType } from '@project/shared/app/types';
import { PostType } from '@project/shared/app/types';
import { fillDto } from '@project/shared/helpers';
import { LinkPostRdo } from '../rdo/link-post.rdo';
import { PhotoPostRdo } from '../rdo/photo-post.rdo';
import { QuotePostRdo } from '../rdo/quote-post.rdo';
import { TextPostRdo } from '../rdo/text-post.rdo';
import { VideoPostRdo } from '../rdo/video-post.rdo';

export function adaptRdoPost(post: PostContentType) {
  switch (post.type) {
    case PostType.link:
      return fillDto(LinkPostRdo, post);
    case PostType.photo:
      return fillDto(PhotoPostRdo, post);
    case PostType.quote:
      return fillDto(QuotePostRdo, post);
    case PostType.text:
      return fillDto(TextPostRdo, post);
    case PostType.video:
      return fillDto(VideoPostRdo, post);
  }
}
