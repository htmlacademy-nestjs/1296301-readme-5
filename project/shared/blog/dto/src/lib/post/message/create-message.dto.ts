import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Message text',
    example: 'Message',
  })
  @IsString()
  public message: string;

  @ApiProperty({
    description: 'Post ID',
    example: '1',
  })
  @IsInt()
  public postId: string;
}
