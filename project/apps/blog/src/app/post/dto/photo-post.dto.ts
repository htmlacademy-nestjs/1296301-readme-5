import { CreatePostDto } from './create-post.dto';

export class CreatePhotoPostDto extends CreatePostDto {
  public photo: string;
}
