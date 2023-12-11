import { Publication } from './publication.interface';

export interface TextPublication extends Publication {
  title: string;
  announcement: string;
  textPublication: string;
}
