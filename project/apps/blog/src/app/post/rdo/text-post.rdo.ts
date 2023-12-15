import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class TextPostRdo extends PostRdo {
  @Expose()
  public text: string;

  @Expose()
  public title: string;

  @Expose()
  public announcement: string;
}
