import { Publication } from './publication.interface';

export interface LinkPublication extends Publication {
  link: string;
  description?: string;
}
