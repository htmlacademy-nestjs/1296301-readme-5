import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Post ID',
    example: '1'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'User ID',
    example: '1'
  })
  @Expose()
  public userId: string;
}
