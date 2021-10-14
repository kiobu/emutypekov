import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Profile, Character, Account } from './profile.types';
import { TarkovID } from '../item/item.types';
import { LoggerService } from 'src/core/common/util/logger.service';

@Injectable()
export class ProfileService {
  public profiles: Record<TarkovID, Profile> = {};

  constructor(private readonly logger: LoggerService) {
    this.loadProfiles();

    this.logger.debug(`Local accounts found: ${this.getAccounts().length}`);
  }

  loadProfiles(): void {
    IO.readDirSync('./profiles/').forEach((profile) => {
      if (IO.isDir(`./profiles/${profile}`)) {
        try {
          const _p = IO.deserialize(
            IO.readFileSync(`./profiles/${profile}/profile.json`),
          ) as Record<string, any>;

          const p = {
            account: _p['account'],
            character: _p['character'],
          };

          this.profiles[p.account.id] = p as Profile;
        } catch (_) {
          console.error(`${profile} is missing a profile.json.`);
        }
      }
    });
  }

  getProfiles(): Array<Profile> {
    const p: Array<Profile> = [];
    for (const [, v] of Object.entries(this.profiles)) {
      p.push(v);
    }
    return p;
  }

  getCharacters(): Array<Character> {
    return this.getProfiles().map((profile) => profile['character']);
  }

  getAccounts(): Array<Account> {
    return this.getProfiles().map((profile) => profile['account']);
  }

  getProfileById(id: string): Profile {
    return this.getProfiles().find((profile) => {
      return profile.account.aid === id;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createProfile() {}
}
