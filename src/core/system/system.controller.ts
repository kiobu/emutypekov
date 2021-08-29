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
  readonly common: CommonService;
  constructor(logger: LoggerService, common: CommonService) {
    logger.log('Started system controller.');
    this.common = common;
  }

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
      backendUrl: `https://${this.common.serverConfig.address}:${this.common.serverConfig.port}`,
      name: 'BEFTT',
      editions: [],
    };
  }
}
