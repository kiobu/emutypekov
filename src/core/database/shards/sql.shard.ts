import { Injectable } from '@nestjs/common';

// Shard representing one block of the global database.
@Injectable()
export class SQLShard {
  readonly data: any;

  constructor() {
    this.data = {};
  }
}
