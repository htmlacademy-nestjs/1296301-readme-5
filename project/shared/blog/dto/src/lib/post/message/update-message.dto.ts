import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty({
    description: 'Message text',
    example: 'Message',
  })
  @IsString()
  public message: string;
}
