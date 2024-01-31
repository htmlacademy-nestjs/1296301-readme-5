import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { fillDto } from '@project/shared/helpers';
import { MongoIdValidationPipe } from '@project/shared/core';

import { FileLoaderInfo } from './file.constants';
import { FileService } from './file.service';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { FileValidationPipe } from './pipes/validate-file.pipe';

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: FileLoaderInfo.Uploaded,
  })
  @UseInterceptors(FileInterceptor('avatar') as any)
  @Post('upload/avatar')
  public async uploadAvatar(@UploadedFile(FileValidationPipe) file: Express.Multer.File) {
    console.log(file)
    const fileEntity = await this.fileService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: FileLoaderInfo.Uploaded,
  })
  @UseInterceptors(FileInterceptor('photo') as any)
  @Post('upload/photo')
  public async uploadFile(@UploadedFile(FileValidationPipe) file: Express.Multer.File) {
    const fileEntity = await this.fileService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: FileLoaderInfo.Show,
  })
  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);

    return fillDto(UploadedFileRdo, existFile);
  }
}
