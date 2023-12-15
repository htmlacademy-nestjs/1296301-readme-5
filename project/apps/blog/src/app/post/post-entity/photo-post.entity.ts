import { PhotoPost } from '@project/shared/app/types';
import { PostEntity } from './post.entity';

export class PhotoPostEntity extends PostEntity implements PhotoPost {
  public photo: string;

  constructor(postData: PhotoPost) {
    super(postData);
    this.fillEntity(postData);
  }

  public fillEntity(postData: PhotoPost) {
    this.photo = postData.photo;
  }
}
