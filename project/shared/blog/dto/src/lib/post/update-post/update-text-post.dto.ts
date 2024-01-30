import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { UpdateBasePostDto } from './update-base-post.dto';
import { PostTitleLength, PostAnnouncementLength, TextPostLength } from '../post.constants';

export class UpdateTextPostDto extends UpdateBasePostDto {
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
    description: 'Announcement of post',
    example: 'Text',
  })
  @IsString()
  @IsOptional()
  @MinLength(PostAnnouncementLength.Min)
  @MaxLength(PostAnnouncementLength.Max)
  public announcement?: string;

  @ApiProperty({
    description: 'Text of post',
    example: 'Text',
  })
  @IsString()
  @IsOptional()
  @MinLength(TextPostLength.Min)
  @MaxLength(TextPostLength.Max)
  public description?: string;
}
