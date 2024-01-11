import { BasePostDto } from './base-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLinkPostDto extends BasePostDto {
  @ApiProperty({
    description: 'Reference to some resource',
    example: 'https://example.com'
  })
  @IsString()
  @IsNotEmpty()
  public link: string;

  @ApiProperty({
    description: 'Post link description',
    example: 'Description'
  })
  @IsString()
  public description?: string;
}
