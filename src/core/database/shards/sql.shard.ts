import { Injectable } from '@nestjs/common';
import { IShard, ShardType } from './shard.types';

// Shard representing one block of the global database.
@Injectable()
export class SQLShard implements IShard {
  readonly data: any;
  readonly shardType: ShardType;

  constructor() {
    this.data = {};
  }

  read() {
    return this.data;
  }
}
