import { Injectable } from '@nestjs/common';
import { FileRepository } from "../file-repository/file.repository";

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
  ) {}

  public async saveFile(file) {}

  public async getFile(fileId: string) {}
}
