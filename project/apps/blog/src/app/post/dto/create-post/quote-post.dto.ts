import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BasePostDto } from './base-post.dto';

export class CreateQuotePostDto extends BasePostDto {
  @ApiProperty({
    description: 'Text of quote',
    example: 'Quote text',
  })
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty({
    description: 'Quote author name',
    example: 'Author',
  })
  @IsString()
  @IsNotEmpty()
  public quoteAuthor: string;
}
