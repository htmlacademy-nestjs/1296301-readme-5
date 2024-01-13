import { LinkPost } from "@project/shared/app/types";
import { PostEntity } from './post.entity';
import { Entity } from "@project/shared/app/types";

export class LinkPostEntity extends PostEntity implements LinkPost, Entity<string, LinkPost> {
  public link: string;
  public description: string;

  constructor(post: LinkPost) {
    super(post);

    this.populate(post);
  }

  public populate(postData: LinkPost): LinkPostEntity {
    this.link = postData.link;
    this.description = postData.description;

    return this;
  }

  public toPOJO(): LinkPost {
    return {
      ...super.toPOJO(),
      description: this.description,
      link: this.link,
    };
  }
}
