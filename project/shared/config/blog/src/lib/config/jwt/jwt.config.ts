import { registerAs, ConfigType } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { JWTConfig } from './jwt.env';

async function getConfig(): Promise<JWTConfig> {
  const config = plainToClass(JWTConfig, {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });

  await config.validate();

  return config;
}

export default registerAs('jwt', async (): Promise<ConfigType<typeof getConfig>> => {
  return getConfig();
});
