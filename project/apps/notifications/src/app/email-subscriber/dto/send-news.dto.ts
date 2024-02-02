import { IsArray, IsEmail, IsString } from 'class-validator';

import { PostContentType } from '@project/shared/app/types';

import { EmailSubscriberInfo } from '../email-subscriber.constant';

export class SendNewsDto {
  @IsEmail({}, { message: EmailSubscriberInfo.EmailNotValid })
  public email: string;

  @IsArray()
  public posts: PostContentType[];

  @IsString()
  public id: string;
}
