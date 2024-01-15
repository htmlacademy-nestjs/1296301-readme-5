import { VideoPost, Entity } from '@project/shared/app/types';

import { PostEntity } from './post.entity';

export class VideoPostEntity extends PostEntity implements VideoPost, Entity<string, VideoPost> {
  public title: string;
  public link: string;

  constructor(post: VideoPost) {
    super(post);

    this.populate(post);
  }

  public populate(postData: VideoPost): VideoPostEntity {
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
}
