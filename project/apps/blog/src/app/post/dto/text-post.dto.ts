import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from "@nestjs/swagger";

export class CreateTextPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  public description: string;

  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  public title: string;

  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text'
  })
  public announcement: string;
}
