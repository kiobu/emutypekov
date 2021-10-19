import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseErr,
  TarkovResponseOk,
} from './response.types';
import { CommonService } from '../common/common.service';
import { SystemService } from './system.service';

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
  launcher_server_connect(): Record<string, any> {
    return {
      backendUrl: `https://${this.common.serverConfig.address}:${this.common.serverConfig.port}/`,
      name: SystemService.Server,
      editions: ['Edge of Darkness', 'Left Behind'],
    };
  }
}
