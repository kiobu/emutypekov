import { NestFactory } from '@nestjs/core';
import { CommonService } from './core/common/common.service';
import { SystemService } from './core/system/system.service';

import { CoreModule } from './core/core.module';
import { DebugModule } from './core/system/debug/debug.module';

import { InOutInterceptor } from './core/system/system.interceptor';

import * as compression from 'compression';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

const DODEBUG = true;

// Don't use zlib on launcher requests or requests with x-no-compression.
const _shouldCompress = (req, res): boolean =>
  req.url.includes('launcher') || req.headers['x-no-compression']
    ? false
    : compression.filter(req, res);

async function bootstrap(logger: Logger) {
  logger.log(SystemService.Watermark);

  const cert = SystemService.generateCert();

  const app = await NestFactory.create<NestExpressApplication>(CoreModule, {
    httpsOptions: cert,
  });

  app.use(compression({ filter: _shouldCompress }));
  app.useGlobalInterceptors(new InOutInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'web', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'web', 'views'));
  app.setViewEngine('hbs');

  if (DODEBUG) {
    DebugModule.graph(app);
  }

  const common = app.select(CoreModule).get(CommonService);

  try {
    await app.listen(common.serverConfig.port, common.serverConfig.address);
    logger.log(
      `${common.serverConfig.address} is listening on port ${common.serverConfig.port}.`,
    );
  } catch (e) {
    logger.error(e);
  }
}

bootstrap(new Logger('Bootstrapper'));
