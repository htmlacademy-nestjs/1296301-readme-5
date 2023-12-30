import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post photo id',
    example: '/images/user.png',
  })
  public link: string;
}
