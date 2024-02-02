import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';

import { Subscriber, PostContentType } from '@project/shared/app/types';
import { notificationsConfig } from '@project/shared/config/notifications';

import { EmailInfo } from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @Inject(notificationsConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof notificationsConfig>,
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: EmailInfo.AddSubscriber,
      template: './add-subscriber',
      context: {
        user: `${subscriber.userName}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifications(email: string, postsInfo: PostContentType[]) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EmailInfo.AddNews,
      template: './news',
      context: {
        posts: postsInfo
      }
    })
  }
}
