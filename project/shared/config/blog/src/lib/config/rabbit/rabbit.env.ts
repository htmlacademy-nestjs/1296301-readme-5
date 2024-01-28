import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './rabbit.messages';
import { MIN_PORT, MAX_PORT, DEFAULT_RABBIT_PORT } from './rabbit.const';

export class RabbitConfiguration {
  @IsString({ message: EnvValidationMessage.MQHostRequired })
  public host: string;

  @IsString({ message: EnvValidationMessage.MQPasswordRequired })
  public password: string;

  @IsString({ message: EnvValidationMessage.MQUserRequired })
  public user: string;

  @IsString({ message: EnvValidationMessage.MQQueueRequired })
  public queue: string;

  @IsString({ message: EnvValidationMessage.MQExchangeRequired })
  public exchange: string;

  @IsNumber({}, { message: EnvValidationMessage.MQPortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port: number = DEFAULT_RABBIT_PORT;

  public async validate(): Promise<void> {
    try {
      await validateOrReject(this, {
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: false, value: true },
      });
    } catch (errors) {
      console.error('[Blog RabbitMQ Config Validation Error]:', errors);

      throw errors;
    }
  }
}
