import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

import { LINK_DESCRIPTION_LENGTH } from '../post.constants';
import { BasePostDto } from './base-post.dto';

export class CreateLinkPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Reference to some resource',
    example: 'https://example.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  public link: string;

  @ApiProperty({
    description: 'Post link description',
    example: 'Description',
  })
  @IsString()
  @MaxLength(LINK_DESCRIPTION_LENGTH)
  public description?: string;
}
