import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class BasePostDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'text'
  })
  @IsString()
  @IsNotEmpty()
  public type: string;

  @ApiProperty({
    description: 'User id of post',
    example: 'text'
  })
  @IsString()
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'Status of post',
    example: 'published'
  })
  @IsString()
  public status?: string;

  @ApiProperty({
    description: 'Tags of post',
    example: 'text-tag'
  })
  @IsArray()
  public tags?:string[];
}
