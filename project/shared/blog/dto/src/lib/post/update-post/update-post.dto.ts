import { PostType } from '@project/shared/app/types';

import { UpdateLinkPostDto } from './update-link-post.dto';
import { UpdatePhotoPostDto } from './update-photo-post.dto';
import { UpdateQuotePostDto } from './update-quote.post.dto';
import { UpdateTextPostDto } from './update-text-post.dto';
import { UpdateVideoPostDto } from './update-video-post.dto';

export type UpdatePostDto = UpdateLinkPostDto | UpdatePhotoPostDto | UpdateQuotePostDto | UpdateTextPostDto | UpdateVideoPostDto;

export const UpdateTypePostDdo = {
  [PostType.video]: UpdateVideoPostDto,
  [PostType.text]: UpdateTextPostDto,
  [PostType.link]: UpdateLinkPostDto,
  [PostType.photo]: UpdatePhotoPostDto,
  [PostType.quote]: UpdateQuotePostDto
};
