import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export enum FileLoaderParam {
  DefaultPort = 3000,
  DefaultMongoPort = 27017,
}

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = typeof ENVIRONMENTS[number];

export interface FileLoaderConfig {
  environment: string;
  port: number;
  uploadDirectory: string;
  serveRoot: string;
    db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(FileLoaderParam.DefaultPort),
  uploadDirectory: Joi.string().required(),
  serveRoot: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  })
});

function validateConfig(config: FileLoaderConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[FileLoader Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): FileLoaderConfig {
  const config: FileLoaderConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${FileLoaderParam.DefaultPort}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    serveRoot: process.env.SERVE_ROOT,
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? FileLoaderParam.DefaultMongoPort.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
