import { Controller, Get, Post, Render } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseErr,
  TarkovResponseOk,
} from './response.types';
import { CommonService } from '../common/common.service';
import { ProfileService } from 'src/game/profile/profile.service';
import { SystemService } from './system.service';

@Controller()
export class SystemController {
  constructor(
    private readonly common: CommonService,
    private readonly profile: ProfileService,
  ) {}

  @Get('/')
  @Render('home')
  index(): any {
    return { h: 'Welcome to EmiTarkov.' };
  }

  @Get('debug')
  debug(): ITarkovResponse<string> {
    return new TarkovResponseOk('200 OK.');
  }

  @Get('singleplayer/bundles')
  singleplayer_bundles(): Array<undefined> {
    return [];
  }

  @Get('singleplayer/settings/version')
  singleplayer_settings_version(): Record<string, string> {
    return {
      Version: `${SystemService.Server} on ${SystemService.Version}`,
    };
  }

  @Get('client/game/start')
  client_game_start(): ITarkovResponse<string> {
    return new TarkovResponseEmpty();
  }
}
