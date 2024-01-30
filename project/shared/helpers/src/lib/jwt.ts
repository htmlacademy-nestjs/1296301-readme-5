import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

import { TokenPayload, User } from '@project/shared/app/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    userName: user.userName,
    avatar: user.avatar
  };
}

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    }
  }
}
