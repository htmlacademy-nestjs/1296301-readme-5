import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BasePostRdo } from './base-post.rdo';

export class QuotePostRdo extends BasePostRdo {
  @ApiProperty({
    description: 'Text of quote',
    example: 'Quote',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Quote author name',
    example: 'Author',
  })
  @Expose()
  public quoteAuthor: string;
}
