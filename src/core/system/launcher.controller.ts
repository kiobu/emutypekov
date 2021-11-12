import { Controller, Get, Post, Render } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseErr,
  TarkovResponseOk,
} from './response.types';
import { CommonService } from '../common/common.service';
import { SystemService } from './system.service';
import { ProfileService } from 'src/game/profile/profile.service';

@Controller()
export class LauncherController {
  constructor(
    private readonly common: CommonService,
    private readonly profile: ProfileService,
  ) {}

  @Get('/launcher/server/connect')
  launcher_server_connect(): Record<string, any> {
    return {
      backendUrl: `https://${this.common.serverConfig.address}:${this.common.serverConfig.port}`,
      name: SystemService.Server,
      editions: this.profile.getAccountTypes(),
    };
  }
}
