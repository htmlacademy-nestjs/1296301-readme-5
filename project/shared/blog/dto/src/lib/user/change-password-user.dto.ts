import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

import { PasswordLength } from './user.constants';

export class ChangePasswordUserDto {
  @ApiProperty({
    description: 'User current password',
    example: '123456'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password: string;

  @ApiProperty({
    description: 'User new password',
    example: '654321'
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public newPassword: string;
}
