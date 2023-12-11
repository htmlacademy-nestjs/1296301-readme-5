import { Publication } from './publication.interface';

export interface QuotePublication extends Publication {
  quote: string;
  author: string;
}
