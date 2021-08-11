import { Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from 'src/core/common/util/logger.service';
import { ITarkovResponse, TarkovResponseEmpty, TarkovResponseErr, TarkovResponseOk } from './response.types';
import { CommonService } from '../common/common.service';

import * as config from 'configs/server.json'

@Controller()
export class SystemController {
  readonly common: CommonService
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
    return new TarkovResponseOk("200 OK.")
  }

  @Get('/launcher/server/connect')
  launcher_server_connect(): object {
    return {
      backendUrl: `https://127.0.0.1:${this.common.serverConfig.port}/`,
      name: "BEFTT",
      editions: [],
    }
  }
}
