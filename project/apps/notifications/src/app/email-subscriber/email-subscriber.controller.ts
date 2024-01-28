import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/shared/app/types';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { SendNewsDto } from './dto/send-news.dto';

import { getNewPosts } from './utils/get-posts';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notifications',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notifications.subscriber',
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notifications',
    routingKey: RabbitRouting.SendNotifications,
    queue: 'readme.notifications.sendNotifications',
  })
  public async sendNewsletter(dto: SendNewsDto) {
    const receiver = await this.subscriberService.getSubscriber(dto.email);
    const newPosts = getNewPosts(dto, receiver);

    if (receiver && newPosts.length > 0) {
      await this.mailService.sendNotifications(receiver.email, newPosts);
      await this.subscriberService.updateDateSent(receiver);
    }
  }
}
