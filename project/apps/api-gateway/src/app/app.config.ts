export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/auth',
  Blog = 'http://localhost:3001/api/posts',
  Messages = 'http://localhost:3001/api/messages',
  Likes = 'http://localhost:3001/api/likes',
  Files = 'http://localhost:3002/api/files',
}

export enum HttpClientParam {
  MaxRedirect = 5,
  Timeout = 5000
}
