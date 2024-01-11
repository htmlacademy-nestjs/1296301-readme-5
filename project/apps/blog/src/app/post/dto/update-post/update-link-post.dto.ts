import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { UpdateBasePostDto } from "./update-base-post.dto";

export class UpdateLinkPostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Reference to some resource',
    example: 'https://example.com'
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: 'Post link description',
    example: 'Description'
  })
  @IsNotEmpty()
  @IsOptional()
  public description?: string;
}
