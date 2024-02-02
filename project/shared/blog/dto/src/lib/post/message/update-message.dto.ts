import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

import { Message } from './message.constants';

export class UpdateMessageDto {
  @ApiProperty({
    description: 'Message text',
    example: 'Message',
  })
  @IsString()
  @MinLength(Message.MinTextLength)
  @MaxLength(Message.MaxTextLength)
  public message: string;
}
