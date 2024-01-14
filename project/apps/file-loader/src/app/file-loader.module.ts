import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileModule } from './file/file.module';
import { FileLoaderConfigModule, getMongooseOptions } from "@project/shared/config/file-vault";

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
