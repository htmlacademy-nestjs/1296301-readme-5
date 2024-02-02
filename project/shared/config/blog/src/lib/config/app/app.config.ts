import { registerAs, ConfigType } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { AppConfiguration } from './app.env';
import { AppParam, Environment } from './app.const';

async function getConfig(): Promise<AppConfiguration> {
  const config = plainToClass(AppConfiguration, {
    environment: process.env.NODE_ENV as Environment || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : AppParam.DefaultPort,
  });

  await config.validate();

  return config;
}

export default registerAs('application', async (): Promise<ConfigType<typeof getConfig>> => {
  return getConfig();
});
