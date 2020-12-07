import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
//Modules
import { AppModule } from './app.module';

/**
 * Catch all uncaught exceptions
 * @return {void}
 */
process.on('uncaughtException', (err: NodeJS.ErrnoException) => {
  Logger.error(err.message, err.stack);
  process.exit(1);
});

/**
 * Catch SIGINT
 * @return {void}
 */
process.on('SIGINT', () => {
  Logger.error('SIGINT signal received.');
  process.exit(1);
});

async function bootstrap() {
  const port = Number(process.env.APP_PORT);
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => Logger.log(`Application tariff started on port ${port}`, 'Bootstrap'));
}
bootstrap();