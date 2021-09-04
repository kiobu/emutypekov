import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { IShard, ShardType } from './shard.types';
import * as fs from 'fs';

// Shard representing one block of the global database.
@Injectable()
export class JSONShard implements IShard {
  private readonly data: any;

  constructor(shardType: ShardType, path: fs.PathLike) {
    this.data = IO.deserialize(IO.readFileSync(path));
  }

  read(): any {
    return this.data;
  }
}
