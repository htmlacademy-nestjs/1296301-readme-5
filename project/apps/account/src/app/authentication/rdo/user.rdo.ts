import { Expose } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks'
  })
  @Expose()
  public userName: string;

  @ApiProperty({
    description: 'User registration date (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  public registrationDate: string;

  @ApiProperty({
    description: 'User publications count',
    example: '5',
  })
  @Expose()
  public publicationsCount: number;

  @ApiProperty({
    description: 'User subscribers count',
    example: '5',
  })
  @Expose()
  public subscribersCount: number;
}
