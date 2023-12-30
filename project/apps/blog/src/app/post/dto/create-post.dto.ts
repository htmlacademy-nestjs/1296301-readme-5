import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Type of post',
    example: 'text'
  })
  public type: string;

  @ApiProperty({
    description: 'User id of post',
    example: 'text'
  })
  public userId: string;

  @ApiProperty({
    description: 'Status of post',
    example: 'published'
  })
  public status?: string;

  @ApiProperty({
    description: 'Tags of post',
    example: 'text-tag'
  })
  public tags?:string[];
}
