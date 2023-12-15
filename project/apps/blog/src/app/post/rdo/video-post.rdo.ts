import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class VideoPostRdo extends PostRdo {
  @Expose()
  public title: string;

  @Expose()
  public link: string;
}
