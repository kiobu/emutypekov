import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseErr,
  TarkovResponseOk,
} from './response.types';
import { CommonService } from '../common/common.service';
import { SystemService } from './system.service';
import { ProfileService } from 'src/game/profile/profile.service';
import { Profile, Account } from 'src/game/profile/profile.types';
import { Request } from '@nestjs/common';
import { ZLibDeflateJSONInterceptor } from './interceptors/zlibjson.interceptor';
import { LauncherService } from './launcher.service';

@Controller()
export class LauncherController {
  constructor(
    private readonly common: CommonService,
    private readonly profile: ProfileService,
    private readonly launcher: LauncherService,
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
  @Post('/launcher/profile/get')
  launcher_profile_get(@Req() request: Request): Record<string, any> {
    return this.profile.getProfileByUsername(request.body['username'])[
      'account'
    ];
  }

  @UseInterceptors(ZLibDeflateJSONInterceptor)
  @Post('/launcher/profile/login')
  launcher_profile_login(@Req() request: Request): string {
    if (!request.body) {
      return 'FAILED';
    }
    return this.profile.getProfileByUsername(request.body['username'])[
      'account'
    ]['aid'];
  }

  @UseInterceptors(ZLibDeflateJSONInterceptor)
  @Post('launcher/profile/info')
  launcher_profile_info(@Req() request: Request): Record<string, any> {
    return this.launcher.getLauncherProfile(
      this.profile.getProfileByUsername(request.body['username']),
    );
  }
}
