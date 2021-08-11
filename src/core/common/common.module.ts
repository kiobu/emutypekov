import { Global, Module } from '@nestjs/common';
import { LoggerService } from './util/logger.service';
import { CommonService } from './common.service';

/*
 * A module that contains commonly used libraries and services, such as file IO,
 * server configurations, and other server information.
 */

@Global()
@Module({
  providers: [LoggerService, CommonService],
  exports: [LoggerService, CommonService],
})
export class CommonModule {}
