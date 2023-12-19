import { registerAs, ConfigType } from '@nestjs/config';
import { AppConfiguration } from './app/app.env';
import { plainToClass } from 'class-transformer';
import { DEFAULT_PORT, Environment } from './app/app.const';

async function getConfig(): Promise<AppConfiguration> {
  const config = plainToClass(AppConfiguration, {
    environment: process.env.NODE_ENV as Environment || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT,
  });

  await config.validate();

  return config;
}

export default registerAs('application', async (): Promise<ConfigType<typeof getConfig>> => {
  return getConfig();
});
