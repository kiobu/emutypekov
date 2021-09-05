import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Profile, Character } from './profile.types';

@Injectable()
export class ProfileService {
  readonly profiles: Array<Profile>;

  constructor() {
    const p: Array<Profile> = [];
    IO.readDirSync('./profiles/').forEach((profile) => {
      if (IO.isDir(`./profiles/${profile}`)) {
        try {
          p.push(
            new Profile(
              IO.deserialize(
                IO.readFileSync(`./profiles/${profile}/profile.json`),
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
