import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './mongo.messages';
import { MIN_PORT, MAX_PORT, DEFAULT_MONGO_PORT } from './mongo.const';

export class MongoConfiguration {
  @IsString({ message: EnvValidationMessage.DBNameRequired })
  public name: string;

  @IsString({ message: EnvValidationMessage.DBHostRequired })
  public host: string;

  @IsNumber({}, { message: EnvValidationMessage.DBPortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: EnvValidationMessage.DBUserRequired })
  public user: string;

  @IsString({ message: EnvValidationMessage.DBPasswordRequired })
  public password: string;

  @IsString({ message: EnvValidationMessage.DBBaseAuthRequired })
  public authBase: string;

  public async validate(): Promise<void> {
    try {
      await validateOrReject(this, {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: true },
      });
    } catch (errors) {
      console.error('[DB Config Validation Error]:', errors);

      throw errors;
    }
  }
}
