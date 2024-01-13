import { QuotePost } from "@project/shared/app/types";
import { PostEntity } from './post.entity';
import { Entity } from "@project/shared/app/types";

export class QuotePostEntity extends PostEntity implements QuotePost, Entity<string, QuotePost> {
  public description: string;
  public quoteAuthor: string;

  constructor(post: QuotePost) {
    super(post);

    this.populate(post);
  }

  public populate(data: QuotePost): QuotePostEntity {
    this.description = data.description;
    this.quoteAuthor = data.quoteAuthor;

    return this;
  }

  public toPOJO(): QuotePost {
    return {
      ...super.toPOJO(),
      description: this.description,
      quoteAuthor: this.quoteAuthor,
    };
  }
}
