import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { PrismaClientModule } from '@project/shared/blog/models';
import { JwtAccessStrategy, getJwtOptions, CheckAuthGuard } from '@project/shared/helpers';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { HttpClientParam } from '../post/constants/post.constant';

@Module({
  imports: [
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, JwtAccessStrategy, CheckAuthGuard],
  exports: [MessageRepository]
})
export class MessageModule {}
