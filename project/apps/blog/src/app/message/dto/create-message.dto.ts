import { IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  public message: string;

  @IsInt()
  public postId: string;
}
