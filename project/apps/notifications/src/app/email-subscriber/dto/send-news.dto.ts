import { IsArray, IsEmail, IsString } from 'class-validator';

import { PostContentType } from '@project/shared/app/types';

import { EMAIL_NOT_VALID } from '../email-subscriber.constant';

export class SendNewsDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsArray()
  public posts: PostContentType[];

  @IsString()
  public id: string;
}
