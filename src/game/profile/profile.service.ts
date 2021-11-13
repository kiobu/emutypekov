import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Profile, Character, Account } from './profile.types';
import { TarkovID } from '../item/item.types';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  public profiles: Record<TarkovID, Profile> = {};

  constructor() {
    this.loadProfiles();

    this.logger.debug(`Local accounts found: ${this.getAccounts().length}`);
  }

  private loadProfiles(): void {
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
          this.logger.error(`${profile} is missing a profile.json.`);
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

  getAccountTypes(): Array<string> {
    return IO.readDirSync(IO.resolve('database', 'patterns', 'profiles'));
  }

  createProfile(account: Account, character: Character): Profile {
    const path = IO.resolve('profiles', account.nickname);

    if (!IO.exists(path)) {
      IO.mkdirSync(path);
      IO.writeFileSync(
        IO.resolve(path, 'profile.json'),
        IO.serialize({ account, character }),
      );
      this.logger.log(`Created profile for ${account.nickname}.`);
      return IO.deserialize(IO.readFileSync(IO.resolve(path, 'profile.json')));
    } else {
      this.logger.log(`Profile for ${account.nickname} already exists.`);
      return IO.deserialize(IO.readFileSync(IO.resolve(path, 'profile.json')));
    }
  }
}
