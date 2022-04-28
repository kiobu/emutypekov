import { Injectable } from '@nestjs/common';
import { Profile } from 'src/game/profile/profile.types';
import { CommonService } from '../common/common.service';
import { SystemService } from './system.service';

@Injectable()
export class LauncherService {
  constructor(private readonly common: CommonService) {}

  getLauncherProfile(profile: Profile): Record<string, any> {
    const maxLvl = 69;
    const pmc = profile.character as Record<string, any>;
  
    // make sure character completed creation
    if (!("Info" in pmc) || !("Level" in pmc.Info)) {
      return {
        "username": profile.account.nickname,
        "nickname": "unknown",
        "side": "unknown",
        "currlvl": 0,
        "currexp": 0,
        "prevexp": 0,
        "nextlvl": 0,
        "maxlvl": maxLvl,
        "akiData": { "version": SystemService.Version, }
      };
    }

    const currLvl = profile.character.Info['Level'];
    const nextLvl = 10000

    return {
      "username": profile.account.nickname,
      "nickname": profile.character.Info['Nickname'],
      "side": profile.character.Info['Side'],
      "currlvl": profile.character.Info['Level'],
      "currexp": profile.character.Info['Experience'],
      "prevexp": (currLvl === 0) ? 0 : 10,
      "nextlvl": nextLvl,
      "maxlvl": maxLvl,
      "akiData": { "version": SystemService.Version, }
    }
  }
}
