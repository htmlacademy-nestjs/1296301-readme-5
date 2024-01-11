import { QuotePost } from "@project/shared/app/types";
import { PostEntity } from './post.entity';
import { Entity } from "@project/shared/app/types";

export class QuotePostEntity extends PostEntity implements QuotePost, Entity<string, QuotePost> {
  public description: string;
  public quoteAuthor: string;

  public populate(data: QuotePost): QuotePostEntity {
    super.populate(data);

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

  static fromObject(data: QuotePost): QuotePostEntity {
    return new QuotePostEntity().populate(data);
  }
}
