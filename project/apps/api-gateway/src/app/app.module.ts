import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CheckAuthGuard } from '@project/shared/helpers';

import { HttpClientParam } from './app.config';
import { UsersController } from './users.controller';
import { BlogController } from './blog.controller';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
  ],
  controllers: [UsersController, BlogController, MessagesController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
