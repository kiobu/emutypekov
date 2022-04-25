import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Profile, Character, Account } from './profile.types';
import { TarkovID } from '../item/item.types';
import { Logger } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  public profiles: Record<TarkovID, Profile> = {};

  constructor(private readonly databaseService: DatabaseService) {
    this.profiles = databaseService.profilesShard.data;

    this.logger.debug(`Local accounts found: ${this.getAccounts().length}`);
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
