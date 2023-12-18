import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class VideoPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'https://youtu.be/FZ-9Wb',
  })
  @Expose()
  public link: string;
}
