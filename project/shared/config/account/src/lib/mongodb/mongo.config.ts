import { registerAs, ConfigType } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { MongoConfiguration } from './mongo.env';
import { MongoParam } from './mongo.const';

async function getDbConfig(): Promise<MongoConfiguration> {
  const config = plainToClass(MongoConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : MongoParam.DefaultPort,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  });

  await config.validate();

  return config;
}

export default registerAs('db', async (): Promise<ConfigType<typeof getDbConfig>> => {
  return getDbConfig();
});
