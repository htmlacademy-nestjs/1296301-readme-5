export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  Blog = 'http://localhost:3334/api/posts',
  Files = 'http://localhost:3335/api/files',
  Comments = 'http://localhost:3336/api/messages',
  Likes = 'http://localhost:3337/api/likes',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
