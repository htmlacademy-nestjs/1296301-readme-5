import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file.service';
import { MongoIdValidationPipe } from '@project/shared/core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { fillDto } from '@project/shared/helpers';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);

    return fillDto(UploadedFileRdo, existFile);
  }
}
