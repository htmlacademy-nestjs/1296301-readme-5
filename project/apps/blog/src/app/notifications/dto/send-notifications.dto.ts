import { PostContentType } from '@project/shared/app/types';

export class SendNotificationsDto {
  public id: string;
  public email: string;
  public posts: PostContentType[];
}
