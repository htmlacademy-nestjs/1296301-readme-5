import { Transform } from 'class-transformer';

export class PostQuery {
  public user?: string;

  public type?: string;

  @Transform(({ value }) => value.toLowerCase())
  public tag:string;
}
