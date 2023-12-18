import { LinkPost } from '@project/shared/app/types';
import { PostEntity } from './post.entity';

export class LinkPostEntity extends PostEntity implements LinkPost {
  public link: string;
  public description: string;

  constructor(postData: LinkPost) {
    super(postData);
    this.fillEntity(postData);
  }

  public fillEntity(postData: LinkPost) {
    this.link = postData.link;
    this.description = postData.description;
  }
}
