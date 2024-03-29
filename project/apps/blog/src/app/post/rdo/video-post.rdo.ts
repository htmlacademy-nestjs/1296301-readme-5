import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BasePostRdo } from './base-post.rdo';

export class VideoPostRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
  })
  @Expose()
  public title?: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'https://youtu.be/FZ-9Wb',
  })
  @Expose()
  public link?: string;
}
