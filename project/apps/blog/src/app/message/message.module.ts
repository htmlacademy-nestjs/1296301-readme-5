import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaClientModule } from '@project/shared/blog/models';
import { JwtAccessStrategy, getJwtOptions } from '@project/shared/helpers';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';

@Module({
  imports: [
    PrismaClientModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, JwtAccessStrategy],
  exports: [MessageRepository]
})
export class MessageModule {}
