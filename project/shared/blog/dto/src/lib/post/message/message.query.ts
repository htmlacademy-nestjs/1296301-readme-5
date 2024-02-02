import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { SortDirection } from '@project/shared/app/types';

import { Message } from './message.constants';

export class MessageQuery {
  @ApiProperty({
    description: 'limit',
    example: 25,
  })
  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public limit: number = Message.MaxMessagesCount;

  @ApiProperty({
    description: 'Post ID',
    example: '1',
  })
  @IsString()
  @IsOptional()
  public postId?: string;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsString()
  @IsOptional()
  public sortDirection: SortDirection = SortDirection.Desc;

  @ApiProperty({
    description: 'Page number',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
