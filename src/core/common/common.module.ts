import { Module } from '@nestjs/common';
import { LoggerService } from '../util/logger.service';
import { CommonService } from './common.service';

@Module({
  controllers: [], // Only root and debug endpoints should be here.
  providers: [LoggerService, CommonService], // Other system/core providers are here.
})
export class CommonModule {}
