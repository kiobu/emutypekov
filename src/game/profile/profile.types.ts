export type Character = Record<string, any>;
export type Account = {
  aid: string;
  nickname: string;
  password: string;
  wipe: string;
  edition: string;
};

export class Profile {
  account: Account;
  character: Character;

  constructor(obj: Record<string, Account | Character>) {
    this.account = {
      aid: obj['account'].aid,
      nickname: obj['account'].nickname,
      password: obj['account'].password,
      wipe: obj['account'].wipe,
      edition: obj['account'].edition,
    };
    this.character = obj['character'];
  }
}
