import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './app/app.config';
import mongoConfig from './mongodb/mongo.config';
import jwtConfig from './jwt/jwt.config';
import rabbitConfig from './rabbit/rabbit.config';

const ENV_ACCOUNT_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_ACCOUNT_FILE_PATH
    }),
  ]
})
export class ConfigAccountModule {}
