import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BasePostDto } from './base-post.dto';

export class CreateVideoPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'https://youtu.be/FZ-9Wb',
  })
  @IsString()
  @IsNotEmpty()
  public link: string;
}
