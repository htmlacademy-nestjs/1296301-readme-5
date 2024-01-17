import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { BasePostDto } from './base-post.dto';

export class CreatePhotoPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Reference to photo',
    example: 'https://example.com',
  })
  @IsString()
  public link: string;
}
