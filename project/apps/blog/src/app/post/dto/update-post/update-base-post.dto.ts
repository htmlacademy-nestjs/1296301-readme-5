import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsArray, IsNotEmpty } from 'class-validator';
import { PostType } from '@project/shared/app/types';

export class UpdateBasePostDto {
  @ApiProperty({
    description: 'Status of post',
    example: 'published'
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PostType)
  @IsOptional()
  public status?: string;

  @ApiProperty({
    description: 'Tags of post',
    example: ['#text-tag']
  })
  @IsArray()
  @IsOptional()
  public tags?:string[];
}
