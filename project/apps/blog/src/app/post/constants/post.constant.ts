import { SortDirection, SortBy } from '@project/shared/app/types';

export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_POST_SEARCH_COUNT_LIMIT = 20;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_BY = SortBy.CreatedAt;
export const DEFAULT_PAGE_COUNT = 1;

export enum PostMessages {
  Search = 'Search result by title',
  Add = 'Post is added',
  Remove = 'Post removed',
  Repost = 'Reposted',
  Update = 'Post updated',
  ShowAll = 'All posts',
  Show = 'Post by id',
}

export const PostsError = {
  PostNotFound : 'Post is not found',
  Delete : 'Post is not deleted',
  WrongType : 'Wrong post type',
  AlreadyReposted: 'You already reposted this Post',
  NotUserAuthor: 'User is not an author of this Post',
} as const;
