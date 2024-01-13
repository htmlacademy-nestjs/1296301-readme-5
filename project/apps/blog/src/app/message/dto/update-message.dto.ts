import { IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  public message: string;
}
