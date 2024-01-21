import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { RefreshTokenPayload } from '@project/shared/app/types';
import { jwtConfig } from '@project/shared/config/account';

import { TokenNotExistsException } from '../exeptions/token-not-exists.exeption';
import { AuthenticationService } from '../authentication.service';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    const isExists = await this.refreshTokenService.isExists(payload.tokenId);

    if (!isExists) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);

    return await this.authService.getUserByEmail(payload.email);
  }
}
