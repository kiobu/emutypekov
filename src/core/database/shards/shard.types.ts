import { IO } from 'src/core/common/util/io/io.service';
import { ItemID, IItem, TarkovID } from 'src/game/item/item.types';
import { Location } from 'src/game/location/location.types';
import { Profile } from 'src/game/profile/profile.types';

// TODO: May want to use delete require.cache[x] instead of flushing and re-requiring
// every file on every change, but not sure yet.

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDatabaseShard {
  data: any;
  flush?: () => void;
}

export class GlobalsShard implements IDatabaseShard {
  data: Record<string, any> = {};

  flush(): void {
    if (this.data) {
      delete require.cache[IO.resolve('database', 'globals.json')];
    }
    this.data = require(IO.resolve('database', 'globals.json'));
  }

  constructor() {
    this.flush();
  }
}

export class ProfilesShard implements IDatabaseShard {
  data: Record<TarkovID, Profile> = {};

  flush(): void {
    IO.readDirSync('profiles').forEach((profile) => {
      if (IO.isDir(IO.resolve('profiles', profile))) {
        try {
          const _p = require(IO.resolve('profiles', profile, 'profile.json')) as Record<string, any>;

          const p = {
            account: _p['account'],
            character: _p['character'],
          };

          this.data[p.account.aid] = p as Profile;
        } catch (_) {
          // Missing profile.json
        }
      }
    });
  }

  constructor() {
    this.flush();
  }
}

export class ItemsShard implements IDatabaseShard {
  data: Record<ItemID, IItem<any>> = {};
  
  flush() {
    this.data = require(IO.resolve('database', 'items', 'items.json'))
  }

  constructor() {
    this.flush();
  }
}

export class LocationsShard implements IDatabaseShard {
  data: Record<string, Location> = {};

  flush() {
    const dir = IO.readDirSync(IO.resolve('database', 'locations'));

    for (const file in dir) {
      const map = require(IO.resolve('database', 'locations', dir[file])) as Location;

      this.data[map.Id] = map;
    }
  }

  constructor() {
    this.flush();
  }
}
