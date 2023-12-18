import { TextPost } from '@project/shared/app/types';
import { PostEntity } from './post.entity';

export class TextPostEntity extends PostEntity implements TextPost {
  public text: string;
  public title: string;
  public announcement: string;

  constructor(postData: TextPost) {
    super(postData);
    this.fillEntity(postData);
  }

  public fillEntity(postData: TextPost) {
    this.text = postData.text;
    this.title = postData.title;
    this.announcement = postData.announcement;
  }
}
