export interface ITarkovResponse<T> {
  err: number;
  errmsg: string | null;
  data: T;
}

export class TarkovResponseOk<T> implements ITarkovResponse<T> {
  readonly err = 0
  readonly errmsg = null
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class TarkovResponseErr implements ITarkovResponse<null> {
  readonly err = 1;
  errmsg: string;
  readonly data = null;
  constructor(errmsg: string) {
    this.errmsg = errmsg;
  }
}

export class TarkovResponseEmpty implements ITarkovResponse<string> {
  readonly err = 0;
  readonly errmsg = null;
  readonly data = "";
}