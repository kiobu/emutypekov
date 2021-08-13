import { Injectable } from '@nestjs/common';
import { IOService } from 'src/core/common/util/io/io.service';
import { Profile, Character } from './profile.types';

@Injectable()
export class ProfileService {
  readonly io: IOService;
  readonly profiles: Array<Profile>;

  constructor(io: IOService) {
    this.io = io;

    const p: Array<Profile> = [];
    this.io.readDirSync('./profiles/').forEach((profile) => {
      if (this.io.lstatSync(`./profiles/${profile}`).isDirectory()) {
        try {
          p.push(
            new Profile(
              this.io.deserialize(
                this.io.readFileSync(`./profiles/${profile}/profile.json`),
              ) as Record<string, any>,
            ),
          );
        } catch (_) {
          console.error(`${profile} is missing a profile.json.`);
        }
      }
    });

    this.profiles = p;
  }

  getCharacters(): Array<Character> {
    const c: Array<Character> = [];
    this.profiles.forEach((profile) => {
      c.push(profile.character);
    });
    return c;
  }

  getProfileById(id: string): Profile {
    return this.profiles.filter((profile) => {
      return profile.account.aid === id;
    })[0];
  }
}
