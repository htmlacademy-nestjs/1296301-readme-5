import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordUserDto {
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

  @ApiProperty({
    description: 'User id',
    example: '123'
  })
  public userId: string;
}
