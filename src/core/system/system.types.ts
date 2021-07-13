export interface TarkovResponse {
  err: number;
  errmsg: string | null;
  data: Record<string, any>;
}

export interface ResponseOk extends TarkovResponse {
  err: 0;
  errmsg: null;
  data: Record<string, any>;
}

export const NullResponse: TarkovResponse = {
  err: 0,
  errmsg: null,
  data: {},
};

export class ResponseOk implements ResponseOk {
  constructor(data: Record<string, any>) {
    this.data = data;
  }
}
