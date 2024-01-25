import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

import { UpdateMessageDto } from '../dto/update-message.dto';

const TYPE = 'body';

export class UpdateMessageValidationPipe implements PipeTransform {
  async transform(dto: UpdateMessageDto, { type }: ArgumentMetadata) {
    if (type === TYPE) {
      const message = plainToInstance(UpdateMessageDto, dto);
      const errors = await validate(message, { validationError: { target: false }});

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      return dto;
    }
  }
}
