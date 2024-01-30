import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

import { UpdateBasePostDto } from './update-base-post.dto';
import { PostTitleLength, RegExpPattern, PostsError } from '../post.constants';

export class UpdateVideoPostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title',
  })
  @IsString()
  @IsOptional()
  @MinLength(PostTitleLength.Min)
  @MaxLength(PostTitleLength.Max)
  public title?: string;

  @ApiProperty({
    description: 'Youtube link',
    example: 'https://www.youtube.com/watch?v=piqdKWNnqBo',
  })
  @IsOptional()
  @IsUrl()
  @Matches(RegExpPattern.Video, {message: PostsError.WrongSourse})
  public link?: string;
}
