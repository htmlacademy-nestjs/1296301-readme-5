import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

import { BasePostDto } from './base-post.dto';
import { PostTitleLength, RegExpPattern, PostsError } from '../post.constants';

export class CreateVideoPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(PostTitleLength.Min)
  @MaxLength(PostTitleLength.Max)
  public title: string;

  @ApiProperty({
    description: 'Video link text',
    example: 'https://youtu.be/FZ-9Wb',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @Matches(RegExpPattern.Video, {message: PostsError.WrongSourse})
  public link: string;
}
