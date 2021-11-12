import { Controller, Post, Get, Param } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { LocaleService } from './locale.service';
import { Locale, MenuLocale } from './locale.types';

@Controller()
export class LocaleController {
  constructor(private readonly localeS: LocaleService) {}

  @Get('client/menu/locale/:lang')
  debug_profile(@Param() params): ITarkovResponse<MenuLocale> {
    return new TarkovResponseOk(this.localeS.locales[params.lang].menu);
  }
}
