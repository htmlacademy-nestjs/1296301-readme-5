import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class QuotePostRdo extends PostRdo {
  @Expose()
  public text: string;

  @Expose()
  public author: string;
}
