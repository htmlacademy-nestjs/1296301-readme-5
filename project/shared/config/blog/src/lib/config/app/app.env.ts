import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './app.messages';
import { AppParam, Environment } from './app.const';

export class AppConfiguration {
  @IsString({ message: EnvValidationMessage.AppEnvironmentRequired })
  public environment: Environment;

  @IsNumber({}, { message: EnvValidationMessage.AppPortRequired })
  @Min(AppParam.MinPort)
  @Max(AppParam.MaxPort)
  @IsOptional()
  public port: number = AppParam.DefaultPort;

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
