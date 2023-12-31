import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotePostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Text of quote',
    example: 'Quote text'
  })
  public description: string;

  @ApiProperty({
    description: 'Quote author name',
    example: 'Author'
  })
  public quoteAuthor: string;
}
