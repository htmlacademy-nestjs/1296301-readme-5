import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Reference to some resource',
    example: 'http://example.com'
  })
  public link: string;

  @ApiProperty({
    description: 'Post link description',
    example: 'Description'
  })
  public description?: string;
}
