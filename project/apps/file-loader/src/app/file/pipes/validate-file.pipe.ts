import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ALLOWED_MIMETYPES, FileError, ImageType, MaxImageSizeInByte, } from '../file.constants';
import { extension } from 'mime-types';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const { fieldname, size, mimetype } = value;
    const fileExtension = extension(mimetype);
    if (!fileExtension || !ALLOWED_MIMETYPES.includes(fileExtension)) {
      throw new BadRequestException(FileError.MimetypeError);
    }
    const maxSize = fieldname === ImageType.Avatar
      ? MaxImageSizeInByte.Avatar
      : MaxImageSizeInByte.Photo;
    if (size > maxSize) {
      throw new BadRequestException(FileError.InvalidSize);
    }
    return value;
  }
}
