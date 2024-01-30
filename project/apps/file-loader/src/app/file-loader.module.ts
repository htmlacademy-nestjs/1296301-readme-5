import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileLoaderConfigModule } from '@project/shared/config/file-vault';
import { getMongooseOptions } from '@project/shared/helpers';

import { FileModule } from './file/file.module';

@Module({
  imports: [
    FileModule,
    FileLoaderConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
  ],
  controllers: [],
  providers: [],
})
export class FileLoaderModule {}
