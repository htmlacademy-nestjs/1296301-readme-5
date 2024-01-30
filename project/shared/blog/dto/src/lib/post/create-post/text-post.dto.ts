import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { BasePostDto } from './base-post.dto';
import { TextPostLength, PostTitleLength, PostAnnouncementLength } from '../post.constants';

export class CreateTextPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Text of post',
    example: 'Text',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(TextPostLength.Min)
  @MaxLength(TextPostLength.Max)
  public description: string;

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
    description: 'Announcement of post',
    example: 'Text',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(PostAnnouncementLength.Min)
  @MaxLength(PostAnnouncementLength.Max)
  public announcement: string;
}
