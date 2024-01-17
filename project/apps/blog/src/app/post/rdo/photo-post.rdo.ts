import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BasePostRdo } from './base-post.rdo';

export class PhotoPostRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Post photo',
    example: 'example.jpg',
  })
  @Expose()
  public link: string;
}
