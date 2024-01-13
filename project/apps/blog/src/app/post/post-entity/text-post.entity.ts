import { TextPost } from "@project/shared/app/types";
import { PostEntity } from './post.entity';
import { Entity } from "@project/shared/app/types";

export class TextPostEntity extends PostEntity implements TextPost, Entity<string, TextPost> {
  public description: string;
  public title: string;
  public announcement: string;

  constructor(post: TextPost) {
    super(post);

    this.populate(post);
  }

  public populate(postData: TextPost): TextPostEntity {
    this.description = postData.description;
    this.title = postData.title;
    this.announcement = postData.announcement;

    return this;
  }

  public toPOJO(): TextPost {
    return {
      ...super.toPOJO(),
      description: this.description,
      title: this.title,
      announcement: this.announcement,
    };
  }
}
