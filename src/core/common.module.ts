import { Module } from '@nestjs/common';
import { SystemController } from './system/system.controller';
import { LoggerService } from './util/logger.service';

import * as boxen from 'boxen';

@Module({
  controllers: [SystemController], // Only root and debug endpoints should be here.
  providers: [LoggerService], // Other system/core providers are here.
})
export class CommonModule {
  static readonly Server: string = 'BEFTT';
  static readonly Version: string = 'v0.0.1-a';
  static readonly Website: string = 'justemutarkov.eu';
  static readonly Watermark: string =
    '\n' +
    boxen(
      `${CommonModule.Server}\n${CommonModule.Version}\n${CommonModule.Website}`,
      {
        padding: 1,
        margin: 1,
        align: 'center',
      },
    );
}
