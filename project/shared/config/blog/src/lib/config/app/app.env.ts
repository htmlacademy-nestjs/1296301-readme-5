import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './app.messages';
import { MIN_PORT, MAX_PORT, DEFAULT_PORT, Environment } from './app.const';

export class AppConfiguration {
  @IsString({ message: EnvValidationMessage.AppEnvironmentRequired })
  public environment: Environment;

  @IsNumber({}, { message: EnvValidationMessage.AppPortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_PORT;

  public async validate(): Promise<void> {
    try {
      await validateOrReject(this, {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: true },
      });
    } catch (errors) {
      console.error('[App Blog Config Validation Error]:', errors);

      throw errors;
    }
  }
}
