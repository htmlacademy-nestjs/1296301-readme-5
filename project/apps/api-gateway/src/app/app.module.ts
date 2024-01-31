import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CheckAuthGuard } from '@project/shared/helpers';

import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { UsersController } from './users.controller';
import { BlogController } from './blog.controller';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [UsersController, BlogController, MessagesController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
