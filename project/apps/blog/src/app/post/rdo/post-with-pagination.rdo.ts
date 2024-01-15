import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostRdo } from './post.rdo';

export class PostWithPaginationRdo {
  @ApiProperty({
    description: 'Entity list',
  })
  @Expose()
  public entities: PostRdo[];

  @ApiProperty({
    description: 'The total number of pages',
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'The total number of pages',
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'The number of current page in pagination order',
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'The number of items per page in the pagination',
  })
  @Expose()
  public itemsPerPage: number;
}
