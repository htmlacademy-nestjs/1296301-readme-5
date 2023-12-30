import { TextPost } from '@project/shared/app/types';
import { PostEntity } from './post.entity';

export class TextPostEntity extends PostEntity implements TextPost {
  public description: string;
  public title: string;
  public announcement: string;

  constructor(postData: TextPost) {
    super(postData);
    this.fillEntity(postData);
  }

  public fillEntity(postData: TextPost) {
    this.description = postData.description;
    this.title = postData.title;
    this.announcement = postData.announcement;
  }
}
