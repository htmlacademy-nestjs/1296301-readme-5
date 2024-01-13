import { SortDirection } from "@project/shared/app/types";
import { SortBy } from "@project/shared/app/types";

export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_POST_SEARCH_COUNT_LIMIT = 20;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_BY = SortBy.CreatedAt;
export const DEFAULT_PAGE_COUNT = 1;

export const  API_TAG_NAME ='Posts';

export const PostMessages = {
  Add : "Post added successfully",
  Show : "Post is showing",
  Update : "Post updated",
  Remove: "Post removed"
} as const;

export const PostsError = {
  PostNotFound : 'Post is not found',
  Delete : 'Post is not deleted',
  WrongType : 'Wrong post type',
  AlreadyReposted:'You already reposted this Post',
  NotUserAuthor:'User is not an author of this Post',
} as const;

export const PostPath = {
  Main:'Post',
  Repost:'/:id/repost',
  Add:'/add',
  Id: '/:id'
} as const;
