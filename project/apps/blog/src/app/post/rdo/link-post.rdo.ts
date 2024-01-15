import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BasePostRdo } from './base-post.rdo';

export class LinkPostRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Link text',
    example: 'https://example.com',
  })
  @Expose()
  public link: string;

  @ApiProperty({
    description: 'Description of post link',
    example: 'Description',
  })
  @Expose()
  public description: string;
}
