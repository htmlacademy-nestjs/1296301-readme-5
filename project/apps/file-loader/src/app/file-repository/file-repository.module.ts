import { Module } from '@nestjs/common';
import { FileRepository } from './file.repository';

@Module({
  imports: [],
  providers: [FileRepository],
  exports: [FileRepository]
})
export class FileRepositoryModule {}
