import { Controller, Post, Get } from '@nestjs/common';
import { Profile, Character } from './profile.types';
import {
  ITarkovResponse,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  readonly profile: ProfileService;
  constructor(profile: ProfileService) {
    this.profile = profile;
  }

  @Get('client/game/profile/list')
  getProfileList(): ITarkovResponse<Array<Character>> {
    return new TarkovResponseOk(this.profile.getCharacters());
  }
}
