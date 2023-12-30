import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';

export class PhotoPostRdo extends PostRdo {
  @ApiProperty({
    description: 'Post photo',
    example: 'example.jpg'
  })
  @Expose()
  public link: string;
}
