import { CreatePostDto } from './create-post.dto';

export class CreateVideoPostDto extends CreatePostDto {
  public title: string;

  public link: string;
}
