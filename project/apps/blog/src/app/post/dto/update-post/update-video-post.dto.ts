import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

import { UpdateBasePostDto } from './update-base-post.dto';

export class UpdateVideoPostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
  })
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Youtube link',
    example: 'https://www.youtube.com/watch?v=piqdKWNnqBo',
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  public link?: string;
}
