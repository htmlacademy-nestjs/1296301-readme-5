import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { UpdateBasePostDto } from "./update-base-post.dto";

export class UpdateTextPostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Title'
  })
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Announcement of post',
    example: 'Text'
  })
  @IsNotEmpty()
  @IsOptional()
  public announcement?: string;

  @ApiProperty({
    description: 'Text of post',
    example: 'Text'
  })
  @IsNotEmpty()
  @IsOptional()
  public description?: string;
}
