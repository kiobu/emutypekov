import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { DatabaseService } from 'src/core/database/database.service';
import { Profile, Character } from './profile.types';

@Injectable()
export class ProfileService {
  constructor(private readonly database: DatabaseService) {}

  getCharacters(): Array<Character> {
    const c: Array<Character> = [];
    Object.keys(this.database.profilesShard.read()['profiles']).forEach(
      (profile) => {
        const p = this.database.profilesShard.read()['profiles'];
        c.push(p[profile].character);
      },
    );
    return c;
  }

  getProfileById(id: string): Profile {
    return this.database.profilesShard.read()['profiles'][id];
  }
}
