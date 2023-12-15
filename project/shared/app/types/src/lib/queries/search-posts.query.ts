import { Transform } from 'class-transformer';

export class SearchPostsQuery {
  @Transform(({value}) => decodeURIComponent(value))
  public title: string;
}
