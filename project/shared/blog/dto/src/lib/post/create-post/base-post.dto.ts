import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, ArrayMaxSize, IsEnum, IsOptional, Matches, MaxLength, MinLength, NotContains } from 'class-validator';

import { PostType, PublicationStatus } from '@project/shared/app/types';
import { RegExpPattern, TagDefaultParam, PostsError } from "../post.constants";


export class BasePostDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'text',
  })
  @IsEnum(PostType)
  public type: string;

  @ApiProperty({
    description: 'User id of post',
    example: 'text',
  })
  @IsString()
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'Status of post',
    example: 'published',
  })
  @IsOptional()
  @IsEnum(PublicationStatus)
  public status?: string;

  @ApiProperty({
    description: 'Tags of post',
    example: '#text-tag',
  })
  @IsOptional()
  @NotContains(' ', { each: true, message: PostsError.SpacesInTag })
  @Matches(RegExpPattern.Tag, { each: true, message: PostsError.WrongTagStart })
  @MinLength(TagDefaultParam.MinLength, { each: true })
  @MaxLength(TagDefaultParam.MaxLength, { each: true })
  @ArrayMaxSize(TagDefaultParam.Amount)
  public tags?: string[];
}
