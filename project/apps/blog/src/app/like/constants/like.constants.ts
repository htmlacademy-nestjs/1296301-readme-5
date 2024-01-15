export enum LikesMessage {
  Add = 'Like added',
  Show = 'Like by post',
  Delete = 'Like removed',
}

export const LikeError = {
  AlreadyExist: 'You already liked this Post',
  NoExistLikeId: 'You are trying to delete a non-existent like',
  NoCorrespondingUser: 'You cannot delete another users like'
} as const;
