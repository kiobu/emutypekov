import { Controller, Get, Post, Render, UseInterceptors } from '@nestjs/common';
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
  @Render('home')
  index(): any {
    return { h: 'Welcome to EmiTarkov.' };
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
