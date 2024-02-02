import { IsEmail, IsNotEmpty } from 'class-validator';

import { EmailSubscriberInfo } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailSubscriberInfo.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: EmailSubscriberInfo.UserEmpty })
  public userName: string;
}
