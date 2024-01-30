import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ArrayMaxSize, IsEnum, IsOptional, Matches, MaxLength, MinLength, NotContains } from 'class-validator';

import { PublicationStatus } from '@project/shared/app/types';

import { RegExpPattern, TagDefaultParam, PostsError } from '../post.constants';

export class UpdateBasePostDto {
  @ApiProperty({
    description: 'Status of post',
    example: 'published',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PublicationStatus)
  @IsOptional()
  public status?: string;

  @ApiProperty({
    description: 'Tags of post',
    example: ['#text-tag'],
  })
  @IsOptional()
  @NotContains(' ', { each: true, message: PostsError.SpacesInTag })
  @Matches(RegExpPattern.Tag, { each: true, message: PostsError.WrongTagStart })
  @MinLength(TagDefaultParam.MinLength, { each: true })
  @MaxLength(TagDefaultParam.MaxLength, { each: true })
  @ArrayMaxSize(TagDefaultParam.Amount)
  public tags?: string[];
}
