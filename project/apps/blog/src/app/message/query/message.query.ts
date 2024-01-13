import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from 'class-transformer';
import { MAX_MESSAGES_COUNT, DEFAULT_SORT_DIRECTION } from "../constants/message.constants";
import { SortDirection } from "@project/shared/app/types";

export class MessageQuery {
  @Transform(({ value } ) => +value)
  @IsNumber()
  @IsOptional()
  public limit: number = MAX_MESSAGES_COUNT;

  @IsString()
  @IsOptional()
  public postId?: string;

  @IsIn(Object.values(SortDirection))
  @IsString()
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
