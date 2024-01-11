import { CreateLinkPostDto } from './link-post.dto';
import { CreatePhotoPostDto } from './photo-post.dto';
import { CreateVideoPostDto } from './video-post.dto';
import { CreateQuotePostDto } from './quote-post.dto';
import { CreateTextPostDto } from './text-post.dto';

export type CreatePostDto = CreateLinkPostDto | CreatePhotoPostDto | CreateQuotePostDto | CreateTextPostDto | CreateVideoPostDto;

