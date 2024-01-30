export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;

export enum PostMessages {
  Search = 'Search result by title',
  Add = 'Post is added',
  Remove = 'Post removed',
  Repost = 'Reposted',
  Update = 'Post updated',
  ShowAll = 'All posts',
  ShowAllUserDrafts = 'Show all user draft posts',
  ShowUserPostCount = 'User all posts count',
  Show = 'Post by id',
  SendNews = 'News',
}

export const PostsError = {
  PostNotFound : 'Post is not found',
  Delete : 'Post is not deleted',
  WrongType : 'Wrong post type',
  AlreadyReposted: 'You already reposted this Post',
  NotUserAuthor: 'User is not an author of this Post',
  EmptyList: 'Posts list is empty',
} as const;

export enum HttpClientParam {
  MaxRedirect = 5,
  Timeout = 5000
}
