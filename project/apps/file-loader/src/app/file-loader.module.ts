import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileLoaderConfigModule, getMongooseOptions } from '@project/shared/config/file-vault';

import { FileModule } from './file/file.module';

@Module({
  imports: [
    FileModule,
    FileLoaderConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class FileLoaderModule {}
