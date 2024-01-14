import { Types } from 'mongoose';
import {
  ArgumentMetadata, BadRequestException, Injectable,
  PipeTransform
} from '@nestjs/common';

const TYPE = 'param';
const PIPE_ERROR = 'This pipe must used only with params!';
const BAD_MONGO_ID_ERROR = 'Bad entity ID';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== TYPE) {
      throw new Error(PIPE_ERROR)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGO_ID_ERROR);
    }

    return value;
  }
}
