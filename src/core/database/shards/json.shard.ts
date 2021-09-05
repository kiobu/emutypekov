import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { IShard, ShardType } from './shard.types';
import * as fs from 'fs';

// Shard representing one block of the global database.
@Injectable()
export class JSONShard implements IShard {
  private readonly data: any; // Maybe should add a type here for files/data blocks? (can be TarkovData or Array<TarkovData>?)
  readonly shardType: ShardType;

  constructor(shardType: ShardType, path: fs.PathLike) {
    this.shardType = shardType;

    if (IO.isDir(path)) {
      this.data = [];
      const dir = IO.readDirSync(path);
      for (const file in dir) {
        this.data.push(
          IO.deserialize(
            IO.readFileSync(IO.resolve(path as string, dir[file])),
          ),
        );
      }
    } else {
      this.data = IO.deserialize(IO.readFileSync(path));
    }
  }

  read(): any {
    return this.data;
  }
}
