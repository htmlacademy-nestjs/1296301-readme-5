import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

import { CreateMessageDto } from '@project/shared/blog/dto';

const TYPE = 'body';

export class CreateMessageValidationPipe implements PipeTransform {
  async transform(dto: CreateMessageDto, { type }: ArgumentMetadata) {
    if (type === TYPE) {
      const message = plainToInstance(CreateMessageDto, dto);
      const errors = await validate(message, { validationError: { target: false }});

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      return dto;
    }
  }
}
