import { Controller, Post, Get, Param } from '@nestjs/common';
import { Profile, Character, Account } from './profile.types';
import {
  ITarkovResponse,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}

  @Get('client/game/profile/list')
  client_game_profile_list(): ITarkovResponse<Array<Character>> {
    return new TarkovResponseOk(this.profile.getCharacters());
  }

  @Get('debug/profile/:id')
  debug_profile(@Param() params): ITarkovResponse<Profile> {
    return new TarkovResponseOk(this.profile.getProfileById(params.id));
  }

  @Get('debug/profile/create/new')
  debug_profile_create(): void {
    let p = this.profile.createProfile(
      {
        aid: '123456',
        nickname: 'johndoe1',
        password: 'johndoe1',
        wipe: false,
        edition: 'Standard',
      },
      {},
    );

    console.log(p.account.aid);
  }
}
