import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUrl, MaxLength } from 'class-validator';

import { UpdateBasePostDto } from './update-base-post.dto';
import { LINK_DESCRIPTION_LENGTH } from '../post.constants';

export class UpdateLinkPostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Reference to some resource',
    example: 'https://example.com',
  })
  @IsUrl()
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: 'Post link description',
    example: 'Description',
  })
  @IsOptional()
  @MaxLength(LINK_DESCRIPTION_LENGTH)
  public description?: string;
}
