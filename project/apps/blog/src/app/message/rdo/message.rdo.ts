import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MessageRdo {
  @ApiProperty({
    description: 'Message ID',
    example: '1',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Post ID',
    example: '1',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Message text',
    example: 'Message',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Author message ID',
    example: '1',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Message date',
  })
  @Expose()
  public createdAt: Date;
}
