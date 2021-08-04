import { NestFactory } from '@nestjs/core';
import { LoggerService } from './core/common/util/logger.service';
import { CommonService } from './core/common/common.service';
import { SystemService } from './core/system/system.service';

import { CoreModule } from './core/core.module';

import * as compression from "compression";

async function bootstrap(logger: LoggerService) {
  logger.log(SystemService.Watermark);

  const app = await NestFactory.create(CoreModule);
  app.use(compression())

  const common = app.select(CoreModule).get(CommonService);

  try {
    await app.listen(common.serverConfig.port, common.serverConfig.address);
    logger.success(`${common.serverConfig.address} is listening on port ${common.serverConfig.port}.`)
  } catch (e) {
    logger.error(e)
  }
}

bootstrap(new LoggerService());
