import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

import { MessageTextLength } from './message.constants';

export class UpdateMessageDto {
  @ApiProperty({
    description: 'Message text',
    example: 'Message',
  })
  @IsString()
  @MinLength(MessageTextLength.Min)
  @MaxLength(MessageTextLength.Max)
  public message: string;
}
