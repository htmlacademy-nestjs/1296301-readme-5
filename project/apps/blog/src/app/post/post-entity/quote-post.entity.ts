import { QuotePost } from '@project/shared/app/types';
import { PostEntity } from './post.entity';

export class QuotePostEntity extends PostEntity implements QuotePost {
  public text: string;
  public author: string;

  constructor(postData: QuotePost) {
    super(postData);
    this.fillEntity(postData);
  }

  public fillEntity(postData: QuotePost) {
    this.text = postData.text;
    this.author = postData.author;
  }
}
