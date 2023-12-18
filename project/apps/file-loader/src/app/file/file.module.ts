import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepositoryModule } from "../file-repository/file-repository.module";

@Module({
  imports: [FileRepositoryModule],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
