import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { UpdateBasePostDto } from './update-base-post.dto';
import { PostAuthorLength, QuotePostLength } from '../post.constants';

export class UpdateQuotePostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Quote author name',
    example: 'Author',
  })
  @IsString()
  @IsOptional()
  @MinLength(PostAuthorLength.Min)
  @MaxLength(PostAuthorLength.Max)
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'Text of quote',
    example: 'Quote text',
  })
  @IsString()
  @IsOptional()
  @MinLength(QuotePostLength.Min)
  @MaxLength(QuotePostLength.Max)
  public description?: string;
}
