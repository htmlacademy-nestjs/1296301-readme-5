/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { BlogModule } from './app/blog.module';

async function bootstrap() {
  const globalPrefix = 'api';
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create(BlogModule);
  const config = new DocumentBuilder()
    .setTitle('The «Blog» service')
    .setDescription('Blog service API')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
