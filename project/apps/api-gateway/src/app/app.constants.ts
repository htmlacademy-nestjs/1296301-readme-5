export const UserInfo = {
  NotFound : 'User is not found',
  InvalidData: 'Data is invalid',
  Register : "User registered successfully",
  Login: "Login successfull",
  UserFound: "User data found",
  PasswordChanged: "Password successfully changed",
  Refresh: 'Get a new access/refresh tokens',
  AvatarAdded: "Avatar added successfully"
} as const;

export const MessagesInfo = {
  Add : 'Message added successfully',
  Show: 'All messages are shown',
  Update: 'Message updated successfully',
  Remove: 'Message was removed',
  InvalidPost : 'Post is not found',
  InvalidMessage : 'Message with this id is not found',
} as const;

export const BlogInfo = {
  PostNotFound: 'Post is not found',
  EmptyList: 'There are no posts that can be loaded',
  ShowSingle: 'Post is showing',
  ShowAll: 'List of posts is showing',
  NewsSent: 'Posts sent',
  DeleteError : 'Post is not deleted',
  Add : 'Post added successfully',
  Update : 'Post updated',
  Remove: 'Post removed',
  ShowLikes: 'List of likes are showing',
  SetLike : 'Like was set',
  RemoveLike : 'Like was removed',
} as const;
