import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

import { UpdateBasePostDto } from './update-base-post.dto';

export class UpdatePhotoPostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Reference to photo',
    example: '/images/user.png',
  })
  @IsString()
  @IsOptional()
  public link?: string;
}
