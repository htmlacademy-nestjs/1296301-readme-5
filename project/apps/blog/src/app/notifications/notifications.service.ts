import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { rabbitConfig } from '@project/shared/config/blog';
import { RabbitRouting } from '@project/shared/app/types';

import { SendNotificationsDto } from './dto/send-notifications.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly rabbitClient: AmqpConnection,

    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async sendNews(dto: SendNotificationsDto) {
    return this.rabbitClient.publish<SendNotificationsDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNotifications,
      { ...dto }
    );
  }
}
