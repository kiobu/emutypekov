import { NestFactory } from '@nestjs/core';
import { CommonModule } from './core/common.module';
import { LoggerService } from './core/util/logger.service';

import { CoreModule } from './core/core.module';

import * as config from 'configs/server.json';

async function bootstrap(logger: LoggerService) {
  logger.log(CommonModule.Watermark);
  const app = await NestFactory.create(CoreModule);
  await app.listen(config.port);
}

bootstrap(new LoggerService());
