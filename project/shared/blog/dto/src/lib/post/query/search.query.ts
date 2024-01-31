import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { SortDirection } from '@project/shared/app/types';

import { DEFAULT_POST_SEARCH_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from './post.constant';

export class SearchQuery {
  @ApiProperty({
    description: 'Limit',
    example: 25,
  })
  @Transform(({ value } ) => +value || DEFAULT_POST_SEARCH_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_SEARCH_COUNT_LIMIT;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Title',
    example: 'title',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => decodeURIComponent(value))
  public title?: string;
}
