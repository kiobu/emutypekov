import { Injectable } from '@nestjs/common';
import { IShard } from './shard.types';

// Shard representing one block of the global database.
@Injectable()
export class SQLShard implements IShard {
  readonly data: any;

  constructor() {
    this.data = {};
  }

  read() {}
}
