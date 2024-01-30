import { IsString, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './jwt.messages';

export class JWTConfig {
  @IsString({ message: EnvValidationMessage.AccessTokenSecretRequired })
  public accessTokenSecret: string;

  @IsString({ message: EnvValidationMessage.AccessTokenExpiresInRequired })
  public accessTokenExpiresIn: string;

  @IsString({ message: EnvValidationMessage.RefreshTokenSecretRequired })
  public refreshTokenSecret: string;

  @IsString({ message: EnvValidationMessage.RefreshTokenExpiresInRequired })
  public refreshTokenExpiresIn: string;

  public async validate(): Promise<void> {
    try {
      await validateOrReject(this, {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: true },
      });
    } catch (error) {
      console.error(`[Account JWTConfig Validation Error]: ${error.message}`);

      throw error;
    }
  }
}
