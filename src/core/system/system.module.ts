import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';

import * as boxen from 'boxen';

@Module({
  controllers: [SystemController],
  providers: [],
  exports: []
})
export class SystemModule {
  private static readonly Server: string = 'BEFTT';
  private static readonly Version: string = 'v0.0.1-a';
  private static readonly Website: string = 'justemutarkov.eu';
  static readonly Watermark: string =
    '\n' +
    boxen(
      `${SystemModule.Server}\n${SystemModule.Version}\n${SystemModule.Website}`,
      {
        padding: 1,
        margin: 1,
        align: 'center',
      },
    );
}