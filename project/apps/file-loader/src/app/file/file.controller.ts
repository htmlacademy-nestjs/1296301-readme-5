import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";

import { fillDto } from '@project/shared/helpers';
import { MongoIdValidationPipe } from '@project/shared/core';

import { FileLoaderMessages, MAX_AVATAR_SIZE_IN_KILOBYTES, MAX_PHOTO_SIZE_IN_KILOBYTES, maxAvatarSizeInBytes, maxPhotoSizeInBytes } from "./file.constants";
import { FileService } from './file.service';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: FileLoaderMessages.Uploaded,
  })
  @UseInterceptors(FileInterceptor('file') as any)
  @Post('upload/avatar')
  public async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    if (file.size > maxAvatarSizeInBytes) {
      throw new ConflictException(`File size is more than ${MAX_AVATAR_SIZE_IN_KILOBYTES}kb.`);
    }
    const fileEntity = await this.fileService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: FileLoaderMessages.Uploaded,
  })
  @UseInterceptors(FileInterceptor('file') as any)
  @Post('upload/photo')
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (file.size > maxPhotoSizeInBytes) {
      throw new ConflictException(`File size is more than ${MAX_PHOTO_SIZE_IN_KILOBYTES}kb.`);
    }
    const fileEntity = await this.fileService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: FileLoaderMessages.Show,
  })
  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);

    return fillDto(UploadedFileRdo, existFile);
  }
}
