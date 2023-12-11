import { PublicationStatus } from './publication-status-enum';

export interface Publication {
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  status?: PublicationStatus;
  publicationDate: string;
  creationDate: string;
  tags?: string[];
  isRepost?: boolean;
  originalAuthorFirstName?: string;
  originalAuthorLastName?: string;
  originalAuthorId?: string;
}
