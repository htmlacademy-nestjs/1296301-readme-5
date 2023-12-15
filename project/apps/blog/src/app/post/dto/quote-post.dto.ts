import { CreatePostDto } from './create-post.dto';

export class CreateQuotePostDto extends CreatePostDto {
  public text: string;

  public author: string;
}
