import { VideoPost } from '@project/shared/app/types';
import { PostEntity } from './post.entity';

export class VideoPostEntity extends PostEntity implements VideoPost {
  public title: string;
  public link: string;

  constructor(postData: VideoPost) {
    super(postData);
    this.fillEntity(postData);
  }

  public fillEntity(postData: VideoPost) {
    this.title = postData.title;
    this.link = postData.link;
  }
}
