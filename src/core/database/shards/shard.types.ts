import { IO } from 'src/core/common/util/io/io.service';
import { ItemID, IItem, TarkovID } from 'src/game/item/item.types';
import { Location } from 'src/game/location/location.types';
import { Profile } from 'src/game/profile/profile.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDatabaseShard {
  data: any;
}

export class ProfilesShard implements IDatabaseShard {
  data: Record<TarkovID, Profile>;

  constructor() {
    IO.readDirSync('./profiles/').forEach((profile) => {
      if (IO.isDir(`./profiles/${profile}`)) {
        try {
          const _p = require(IO.readFileSync(`./profiles/${profile}/profile.json`)) as Record<string, any>;

          const p = {
            account: _p['account'],
            character: _p['character'],
          };

          this.data[p.account.id] = p as Profile;
        } catch (_) {
          // Missing profile.json
        }
      }
    });
  }
}

export class ItemsShard implements IDatabaseShard {
  data: Record<ItemID, IItem<any>>;

  constructor() {
    this.data = require(IO.resolve('database', 'items', 'items.json'))
  }
}

export class LocationsShard implements IDatabaseShard {
  data: Record<string, Location>;

  constructor() {
    const dir = IO.readDirSync(IO.resolve('database', 'locations'));

    this.data = {};

    for (const file in dir) {
      const map = require(IO.resolve('database', 'locations', dir[file])) as Location;

      this.data[map.Id] = map;
    }
  }
}
