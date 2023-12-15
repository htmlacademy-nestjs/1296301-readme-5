import { CreatePostDto } from './create-post.dto';

export class CreateLinkPostDto extends CreatePostDto {
  public link: string;

  public description?: string;
}
