import { TarkovID } from '../item/item.types';

// TODO: Elaborate on this in the future.
export type Character = Record<string, unknown>;

export class Account {
  aid: TarkovID;
  nickname: string;
  password: string;
  wipe: boolean;
  edition: string; // TODO: Edition enum?
}

export class Profile {
  account: Account;
  character: Character;
}
