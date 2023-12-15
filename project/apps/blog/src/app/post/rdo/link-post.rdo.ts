import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class LinkPostRdo extends PostRdo {
  @Expose()
  public link: string;

  @Expose()
  public description: string;
}
