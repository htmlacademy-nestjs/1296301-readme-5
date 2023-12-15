import { CreatePostDto } from './create-post.dto';

export class CreateTextPostDto extends CreatePostDto {
  public text: string;

  public title: string;

  public announcement: string;
}
