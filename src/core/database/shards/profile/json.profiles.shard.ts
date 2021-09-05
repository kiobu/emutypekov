import { IShard, ShardType } from '../shard.types';
import { IO } from 'src/core/common/util/io/io.service';
import { Profile } from 'src/game/profile/profile.types';
import * as fs from 'fs';
import { assert } from 'console';

export class JSONProfilesShard implements IShard {
  private readonly data = { profiles: {} };
  readonly shardType: ShardType = ShardType.Profiles;

  constructor(path: fs.PathLike) {
    const profilesDir = IO.readDirSync(path);

    profilesDir.forEach((profileDir) => {
      assert(IO.isDir(IO.resolve(path as string, profileDir)));

      const profile = new Profile(
        IO.deserialize(
          IO.readFileSync(
            IO.resolve(path as string, profileDir, 'profile.json'),
          ),
        ) as Record<string, any>,
      );

      this.data.profiles[profile.account.aid] = profile;
    });
  }

  read() {
    return this.data;
  }
}
