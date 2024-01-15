import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BasePostRdo } from './base-post.rdo';

export class TextPostRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Text of post',
    example: 'Text',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text',
  })
  @Expose()
  public announcement: string;
}
