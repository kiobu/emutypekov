import { Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from 'src/core/common/util/logger.service';
import { ITarkovResponse, TarkovResponseEmpty, TarkovResponseErr, TarkovResponseOk } from './response.types';

import * as config from 'configs/server.json'

@Controller()
export class SystemController {
  constructor(logger: LoggerService) {
    logger.log('Started system controller.');
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
      backendUrl: `https://127.0.0.1:${config.port}/`,
      name: "BEFTT",
      editions: ["Standard"],
    }
  }
}
