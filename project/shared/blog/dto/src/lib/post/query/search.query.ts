import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { SortDirection } from '@project/shared/app/types';

import { Query } from './post-query.constant';

export class SearchQuery {
  @ApiProperty({
    description: 'Limit',
    example: 25,
  })
  @Transform(({ value } ) => +value || Query.PostSearchCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = Query.PostSearchCountLimit;

  @ApiProperty({
    description: 'Sort direction',
    example: 'desc',
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = SortDirection.Desc;

  @ApiProperty({
    description: 'Title',
    example: 'title',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => decodeURIComponent(value))
  public title?: string;
}
