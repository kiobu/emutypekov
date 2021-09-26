import { Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from 'src/core/common/util/logger.service';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseErr,
  TarkovResponseOk,
} from './response.types';
import { CommonService } from '../common/common.service';

@Controller()
export class SystemController {
  constructor(private readonly common: CommonService) {}

  @Get('/')
  index(): string {
    return 'Hello world!';
  }

  @Get('debug')
  debug(): ITarkovResponse<string> {
    return new TarkovResponseOk('200 OK.');
  }

  @Get('/launcher/server/connect')
  launcher_server_connect(): Record<string, unknown> {
    return {
      Url: `https://${this.common.serverConfig.address}`,
      name: 'SPT-AKI',
    };
  }
}
