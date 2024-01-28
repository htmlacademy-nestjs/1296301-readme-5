import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationsModule } from '@project/shared/config/notifications';
import { getMongooseOptions } from '@project/shared/helpers';

import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    NotificationsModule,
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
