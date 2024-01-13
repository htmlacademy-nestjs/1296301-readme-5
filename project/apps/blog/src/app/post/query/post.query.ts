import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType, SortBy, SortDirection } from "@project/shared/app/types";
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_BY } from '../constants/post.constant';


export class PostQuery {
  @ApiProperty({
    description: 'Limit',
    example: 25
  })
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @ApiProperty({
    description: 'Type',
    example: 'text'
  })
  @IsIn(Object.values(PostType))
  @IsOptional()
  public type?: PostType;

  @ApiProperty({
    description: 'User ID',
    example: '1'
  })
  @IsOptional()
  public userId?: string;

  @ApiProperty({
    description: 'Sort by',
    example: 'createdAt'
  })
  @IsIn(Object.values(SortBy))
  @IsOptional()
  public sortBy?: SortBy = DEFAULT_SORT_BY;

  @ApiProperty({
    description: 'Tag',
    example: 'tag'
  })
  @IsOptional()
  public tag?: string = '';

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc'
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'Page',
    example: 1
  })

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
