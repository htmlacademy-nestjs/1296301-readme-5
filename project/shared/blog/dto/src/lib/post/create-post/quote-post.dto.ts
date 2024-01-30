import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BasePostDto } from './base-post.dto';

import { PostAuthorLength, QuotePostLength } from '../post.constants';

export class CreateQuotePostDto extends BasePostDto {
  @ApiProperty({
    description: 'Text of quote',
    example: 'Quote text',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(QuotePostLength.Min)
  @MaxLength(QuotePostLength.Max)
  public description: string;

  @ApiProperty({
    description: 'Quote author name',
    example: 'Author',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(PostAuthorLength.Min)
  @MaxLength(PostAuthorLength.Max)
  public quoteAuthor: string;
}
