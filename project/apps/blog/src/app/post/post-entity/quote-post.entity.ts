import { QuotePost } from '@project/shared/app/types';
import { PostEntity } from './post.entity';

export class QuotePostEntity extends PostEntity implements QuotePost {
  public description: string;
  public quoteAuthor: string;

  constructor(postData: QuotePost) {
    super(postData);
    this.fillEntity(postData);
  }

  public fillEntity(postData: QuotePost) {
    this.description = postData.description;
    this.quoteAuthor = postData.quoteAuthor;
  }
}
