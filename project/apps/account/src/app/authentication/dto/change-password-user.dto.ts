import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordUserDto {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  public id: string;

  @ApiProperty({
    description: 'User current password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User new password',
    example: '654321'
  })
  public newPassword: string;
}
