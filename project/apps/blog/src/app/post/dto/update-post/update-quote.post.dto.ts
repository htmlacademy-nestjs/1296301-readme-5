import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { UpdateBasePostDto } from "./update-base-post.dto";

export class UpdateQuotePostDto extends UpdateBasePostDto {
  @ApiProperty({
    description: 'Quote author name',
    example: 'Author'
  })
  @IsNotEmpty()
  @IsOptional()
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'Text of quote',
    example: 'Quote text'
  })
  @IsNotEmpty()
  @IsOptional()
  public description?: string;
}
