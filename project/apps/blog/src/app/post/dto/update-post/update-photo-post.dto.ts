import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { UpdateBasePostDto } from "./update-base-post.dto";

export class UpdatePhotoPostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Reference to photo',
    example: '/images/user.png',
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  public link?: string;
}
