import { registerAs, ConfigType } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { DEFAULT_RABBIT_PORT } from './rabbit.const';
import { RabbitConfiguration } from './rabbit.env';

async function getMqConfig(): Promise<RabbitConfiguration> {
  const config = plainToClass(RabbitConfiguration, {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    user: process.env.RABBIT_USER,
    port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  });

  await config.validate();

  return config;
}

export default registerAs('rabbit', async (): Promise<ConfigType<typeof getMqConfig>> => {
  return getMqConfig();
});
