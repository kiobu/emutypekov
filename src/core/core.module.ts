import { Module } from '@nestjs/common';
import { CommonModules } from 'src/game/common.module';

import * as boxen from 'boxen';

@Module({ imports: [CommonModules] })
export class CoreModule {
  static readonly Server: string = 'KATE';
  static readonly Version: string = 'v0.0.1-a';
  static readonly Website: string = 'kate.kiobu.dev';
  static readonly Watermark: string =
    '\n' +
    boxen(
      `${CoreModule.Server}\n${CoreModule.Version}\n${CoreModule.Website}`,
      {
        padding: 1,
        margin: 1,
        align: 'center',
      },
    );
}
