import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov',
  })
  public lastname: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'http://example.com',
  })
  public avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;
}
