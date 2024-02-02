import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './rabbit.messages';
import { RabbitParam } from './rabbit.const';

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
  @Min(RabbitParam.MinPort)
  @Max(RabbitParam.MaxPort)
  @IsOptional()
  public port: number = RabbitParam.DefaultPort;

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
