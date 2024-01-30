import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app/app.config';
import jwtConfig from './config/jwt/jwt.config';
import rabbitConfig from './config/rabbit/rabbit.config';

const ENV_BLOG_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig, rabbitConfig, appConfig],
      envFilePath: ENV_BLOG_FILE_PATH,
    }),
  ]
})
export class ConfigBlogModule {}
