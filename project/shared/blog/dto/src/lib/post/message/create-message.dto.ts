import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

import { Message } from './message.constants';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Message text',
    example: 'Message',
  })
  @IsString()
  @MinLength(Message.MinTextLength)
  @MaxLength(Message.MaxTextLength)
  public message: string;

  @ApiProperty({
    description: 'Post ID',
    example: '1',
  })
  @IsString()
  public postId: string;
}
