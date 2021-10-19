import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';

/*
 * A module that contains commonly used libraries and services, such as file IO,
 * server configurations, and other server information.
 */

@Global()
@Module({
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
