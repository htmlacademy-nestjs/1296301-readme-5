export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;

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
  Repost:':id/repost',
  Add:'add',
  Id: ':id'
} as const;
