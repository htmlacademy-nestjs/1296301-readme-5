import { Publication } from './publication.interface';

export interface VideoPublication extends Publication {
  title: string;
  reference: string;
}
