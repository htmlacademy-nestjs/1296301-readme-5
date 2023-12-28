import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostRdo {
  @ApiProperty({
    description: 'Unique post ID',
    example: '1'
  })
  @Expose({ name: 'id' })
  public id: string;

  @ApiProperty({
    description: 'Unique post ID if reposted',
    example: '1'
  })
  @Expose({ name: 'originalPostId' })
  public originalPostId: string;

  @ApiProperty({
    description: 'Post type',
    example: 'video'
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Post author ID',
    example: '1'
  })
  @Expose({ name: 'userId' })
  public userId: string;

  @ApiProperty({
    description: 'Post author ID if reposted',
    example: '1'
  })
  @Expose({ name: 'originalUserId' })
  public originalUserId: string;

  @ApiProperty({
    description: 'Date post was created',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date post was published',
  })
  @Expose()
  public publicatedAt: string;

  @ApiProperty({
    description: 'Post status',
    example: 'draft'
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Repost status of post',
    example: false
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: 'Total amount of likes',
    example: '0'
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'Total amount of messages',
    example: '0'
  })
  @Expose()
  public messagesCount: number;

  @ApiProperty({
    description: 'Tag list',
    example: ['test']
  })
  @Expose()
  public tags: string[];
}
