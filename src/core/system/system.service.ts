import { Injectable } from '@nestjs/common';
import { CommonService } from '../common/common.service';

import * as boxen from 'boxen';

@Injectable()
export class SystemService {
  private static readonly Server: string = 'BEFTT';
  private static readonly Version: string = 'v0.0.1-a';
  private static readonly Website: string = 'justemutarkov.eu';
  static readonly Watermark: string =
    '\n' +
    boxen(
      `${SystemService.Server}\n${SystemService.Version}\n${SystemService.Website}`,
      {
        padding: 1,
        margin: 1,
        align: 'center',
      },
    );
  constructor(private common: CommonService) {}
}
