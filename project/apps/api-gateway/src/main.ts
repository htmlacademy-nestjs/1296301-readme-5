/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import  { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/interseptors/request-id.interceptor';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const globalPrefix = 'api';
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
