import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

import { CreateTypePostDto } from '@project/shared/blog/dto';

const TYPE = 'body';

export class CreatePostValidationPipe implements PipeTransform {
  async transform(dto, { type }: ArgumentMetadata) {
    if (type === TYPE) {
      const post = plainToInstance(CreateTypePostDto[dto.type], dto);
      const errors = await validate(post, { validationError: { target: false }});

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      return dto;
    }
  }
}
