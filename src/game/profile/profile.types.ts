export type Character = Record<string, unknown>;
export type Account = Record<string, unknown>;

export class Profile {
  account: Account;
  character: Character;

  constructor(obj: Record<string, Account | Character>) {
    this.account = obj['account'];
    this.character = obj['character'];
  }
}
