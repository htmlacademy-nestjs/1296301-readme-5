import { Controller, Get, Param, Post, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  @Post('/upload')
  public async uploadFile(@UploadedFile() file) {}

  @Get(':fileId')
  public async show(@Param('fileId') fileId: string) {}
}
