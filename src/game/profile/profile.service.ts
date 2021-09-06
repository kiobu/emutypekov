import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Profile, Character } from './profile.types';

@Injectable()
export class ProfileService {
  private readonly profiles: Array<Profile> = [];
  constructor(private readonly database: DatabaseService) {
    this.database.profilesShard.read()['Profiles'].forEach((profile) => {
      this.profiles.push(new Profile(profile));
    });
  }

  getCharacters(): Array<Character> {
    return this.profiles.map((profile) => {
      return profile['character'];
    });
  }

  getProfileById(id: string): Profile {
    return this.profiles.find((profile) => {
      return profile['account']['aid'] === id;
    });
  }
}
