import { BasePostDto } from './base-post.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTextPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text'
  })
  @IsString()
  @IsNotEmpty()
  public announcement: string;
}
