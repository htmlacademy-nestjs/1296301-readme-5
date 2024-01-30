import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository
      .save(new EmailSubscriberEntity().populate({ ...subscriber, dateNotify: dayjs().toISOString() }));
  }

  public async getSubscriber(email: string) {
    return await this.emailSubscriberRepository.findByEmail(email);
  }

  public async updateDateSent(subscriber: EmailSubscriberEntity) {
    const subscriberDto = { ...subscriber, dateNotify: dayjs().toISOString() };
    const updatedSubscriber = new EmailSubscriberEntity().populate(subscriberDto);

    return await this.emailSubscriberRepository.update(subscriber.id, updatedSubscriber);
  }
}
