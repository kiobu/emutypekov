import { NestFactory } from '@nestjs/core';
import { CommonService } from './core/common/common.service';
import { SystemService } from './core/system/system.service';

import { CoreModule } from './core/core.module';
import { DebugModule } from './core/system/debug/debug.module';

import { SystemInterceptor } from './core/system/system.interceptor';

import * as compression from 'compression';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

const DODEBUG = true;

// Don't use zlib on launcher requests or requests with x-no-compression.
const _shouldCompress = (req, res): boolean =>
  req.headers['x-no-compression'] ? false : compression.filter(req, res);

async function bootstrap(logger: Logger) {
  logger.log(SystemService.Watermark);

  const cert = SystemService.generateCert();

  const app = await NestFactory.create<NestExpressApplication>(CoreModule, {
    httpsOptions: cert,
  });

  app.use(compression({ filter: _shouldCompress, encodings: ['deflate'] }));
  app.useGlobalInterceptors(new SystemInterceptor());
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
      `${SystemService.Server} is listening on ${common.serverConfig.address}:${common.serverConfig.port}.`,
    );
  } catch (e) {
    logger.error(e);
  }
}

bootstrap(new Logger('Bootstrapper'));
