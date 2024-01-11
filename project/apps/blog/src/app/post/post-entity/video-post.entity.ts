import { VideoPost } from "@project/shared/app/types";
import { PostEntity } from './post.entity';
import { Entity } from "@project/shared/app/types";

export class VideoPostEntity extends PostEntity implements VideoPost, Entity<string, VideoPost> {
  public title: string;
  public link: string;

  public populate(postData: VideoPost): VideoPostEntity {
    super.populate(postData);

    this.title = postData.title;
    this.link = postData.link;

    return this;
  }

  public toPOJO(): VideoPost {
    return {
      ...super.toPOJO(),
      title: this.title,
      link: this.link,
    };
  }

  static fromObject(data: VideoPost): VideoPostEntity {
    return new VideoPostEntity().populate(data);
  }
}
