/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import  { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/interseptors/request-id.interceptor';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const globalPrefix = 'api';
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The "API-Gateway" service')
    .setDescription('API-Gateway service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
