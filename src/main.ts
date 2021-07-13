import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { LoggerService } from './core/util/logger.service';

import * as config from 'configs/server.json';

async function bootstrap(logger: LoggerService) {
  logger.log(CoreModule.Watermark);
  const app = await NestFactory.create(CoreModule);
  await app.listen(config.port);
}

bootstrap(new LoggerService());
