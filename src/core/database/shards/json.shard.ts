import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { IShard, ShardType } from './shard.types';
import * as fs from 'fs';
import * as assert from 'assert';

// Shard representing one block of the global database.
@Injectable()
export class JSONShard implements IShard {
  private data = {}; // Maybe should add a type here for files/data blocks? (can be TarkovData or Array<TarkovData>?)
  readonly shardType: ShardType;

  constructor(shardType: ShardType, path: fs.PathLike) {
    this.shardType = shardType;
    this.data[shardType];

    switch (this.shardType) {
      case ShardType.Profiles:
        this.constructProfilesShard(path);
        break;
      case ShardType.Locations:
        this.constructGenericShardFromDir(path);
        break;
      case ShardType.Items:
        this.constructGenericShardFromFile(path);
        break;
    }
  }

  read(): any {
    return this.data;
  }

  private constructProfilesShard(path: fs.PathLike): void {
    const profilesDir = IO.readDirSync(path);

    profilesDir.forEach((profileDir) => {
      assert(IO.isDir(IO.resolve(path as string, profileDir)));

      console.log(`Constructing shard for ${profileDir}`);
      this.constructGenericShardFromDir(IO.resolve(path as string, profileDir));
    });

    console.log(this.data);
  }

  private constructGenericShardFromFile(path: fs.PathLike): void {
    console.log(`Reading ${path} as file.`);
    assert(!IO.isDir(path));

    this.data[ShardType[this.shardType]] = IO.deserialize(
      IO.readFileSync(path),
    );
  }

  private constructGenericShardFromDir(path: fs.PathLike): void {
    console.log(`Reading ${path} as dir.`);
    assert(IO.isDir(path));

    // When reading profiles, on a second profile, this array is already
    // instantiated, so we should not overwrite it with an empty one.
    this.data[ShardType[this.shardType]] =
      this.data[ShardType[this.shardType]] || [];

    const dir = IO.readDirSync(path);
    for (const file in dir) {
      this.data[ShardType[this.shardType]].push(
        IO.deserialize(IO.readFileSync(IO.resolve(path as string, dir[file]))),
      );
    }
  }
}
