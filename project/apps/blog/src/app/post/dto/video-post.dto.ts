import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'https://youtu.be/FZ-9Wb'
  })
  public link: string;
}
