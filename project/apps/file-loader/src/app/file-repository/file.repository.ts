import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/shared/core';
import { FileEntity } from './file.entity';

@Injectable()
export class FileRepository extends BaseMemoryRepository<FileEntity, string, FileEntity> {}
