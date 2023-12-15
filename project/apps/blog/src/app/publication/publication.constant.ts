export const API_TAG_NAME = 'Publication';

export const PublicationError = {
  PostNotFound: 'Publication is not found',
  EmptyList: 'There are no posts that can be loaded',
} as const;

export const PublicationMessages = {
  ShowSingle: 'Publication is showing',
  ShowAll: 'List of publications is showing',
  NewsSent: 'Publications sent',
} as const;

export const PublicationPath = {
  Main: 'blog',
  Id: ':id',
  Drafts: 'drafts',
  Search: 'search',
  SendNewsletter: 'send-news',
} as const;
