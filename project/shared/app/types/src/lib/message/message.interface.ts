export interface Message {
  id?: string;
  postId?: string;
  userId: string;
  message: string;
  createdAt: Date;
  updateAt: Date;
}
