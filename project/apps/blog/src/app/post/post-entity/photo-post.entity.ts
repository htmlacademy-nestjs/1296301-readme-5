import { PhotoPost } from "@project/shared/app/types";
import { PostEntity } from './post.entity';
import { Entity } from "@project/shared/app/types";

export class PhotoPostEntity extends PostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public link: string;

  public populate(postData: PhotoPost): PhotoPostEntity {
    super.populate(postData);

    this.link = postData.link;

    return this;
  }

  public toPOJO(): PhotoPost {
    return {
      ...super.toPOJO(),
      link: this.link,
    };
  }

  static fromObject(data: PhotoPost): PhotoPostEntity {
    return new PhotoPostEntity().populate(data);
  }
}
