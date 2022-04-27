import { Controller, Get, Post, Render, Req, UseInterceptors } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseErr,
  TarkovResponseOk,
} from './response.types';
import { CommonService } from '../common/common.service';
import { SystemService } from './system.service';
import { ProfileService } from 'src/game/profile/profile.service';
import { Request } from '@nestjs/common';
import { ZLibDeflateJSONInterceptor } from './interceptors/zlibjson.interceptor';

@Controller()
export class LauncherController {
  constructor(
    private readonly common: CommonService,
    private readonly profile: ProfileService,
  ) {}

  @UseInterceptors(ZLibDeflateJSONInterceptor)
  @Get('/launcher/server/connect')
  launcher_server_connect(): Record<string, any> {
    return {
      backendUrl: `https://${this.common.serverConfig.address}:${this.common.serverConfig.port}`,
      name: SystemService.Server,
      editions: this.profile.getAccountTypes(),
    };
  }
  
  @UseInterceptors(ZLibDeflateJSONInterceptor)
  @Get('/launcher/ping')
  launcher_ping(): string {
    return 'pong!';
  }

  @UseInterceptors(ZLibDeflateJSONInterceptor)
  @Get('/launcher/server/version')
  launcher_server_version(): string {
    return SystemService.Version;
  }

  @UseInterceptors(ZLibDeflateJSONInterceptor)
  @Post('/launcher/profile/login')
  launcher_profile_login(@Req() request: Request): any {
    // ...
  }
}
