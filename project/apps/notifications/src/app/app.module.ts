import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationsModule, getMongooseOptions } from '@project/shared/config/notifications';

import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotificationsModule,
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
