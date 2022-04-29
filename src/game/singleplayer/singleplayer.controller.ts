import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { ZLibDeflateJSONInterceptor } from 'src/core/system/interceptors/zlibjson.interceptor';
import { SystemService } from 'src/core/system/system.service';

@Controller()
export class SingleplayerController {
  @UseInterceptors(ZLibDeflateJSONInterceptor)
  @Post('/singleplayer/settings/version')
  singleplayer_settings_version(): Record<string, string> {
    return { Version: SystemService.Version };
  }
}
