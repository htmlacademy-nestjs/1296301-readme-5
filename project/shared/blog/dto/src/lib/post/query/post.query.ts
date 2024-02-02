import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, MaxLength, MinLength } from 'class-validator';

import { PostType, SortBy, SortDirection } from '@project/shared/app/types';

import { Query } from './post-query.constant';

import { TagDefaultParam } from '../post.constants';

export class PostQuery {
  @ApiProperty({
    description: 'Limit',
    example: 25,
  })
  @Transform(({ value }) => +value || Query.PostCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = Query.PostCountLimit;

  @ApiProperty({
    description: 'Type',
    example: 'text',
  })
  @IsIn(Object.values(PostType))
  @IsOptional()
  public type?: PostType;

  @ApiProperty({
    description: 'User ID',
    example: '1',
  })
  @IsOptional()
  public userId?: string;

  @ApiProperty({
    description: 'Sort by',
    example: 'createdAt',
  })
  @IsIn(Object.values(SortBy))
  @IsOptional()
  public sortBy?: SortBy = SortBy.CreatedAt;

  @ApiProperty({
    description: 'Tag',
    example: 'tag',
  })
  @IsOptional()
  @MinLength(TagDefaultParam.MinLength)
  @MaxLength(TagDefaultParam.MaxLength)
  public tag?: string;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = SortDirection.Desc;

  @ApiProperty({
    description: 'Page',
    example: 1,
  })
  @Transform(({ value }) => +value || Query.PageCount)
  @IsOptional()
  public page: number = Query.PageCount;
}
