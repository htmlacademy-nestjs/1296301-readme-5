import { PhotoPost } from "@project/shared/app/types";
import { PostEntity } from './post.entity';
import { Entity } from "@project/shared/app/types";

export class PhotoPostEntity extends PostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public link: string;

  constructor(post: PhotoPost) {
    super(post);

    this.populate(post);
  }

  public populate(postData: PhotoPost): PhotoPostEntity {
    this.link = postData.link;

    return this;
  }

  public toPOJO(): PhotoPost {
    return {
      ...super.toPOJO(),
      link: this.link,
    };
  }
}
