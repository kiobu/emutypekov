import { IO } from 'src/core/common/util/io/io.service';
import { ItemID, IItem } from 'src/game/item/item.types';
import { Location } from 'src/game/location/location.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDatabaseShard {
  data: any;
}

export class ItemsShard implements IDatabaseShard {
  data: Record<ItemID, IItem<any>>;

  constructor() {
    this.data = IO.deserialize(
      IO.readFileSync(IO.resolve('database', 'items', 'items.json')),
    );
  }
}

export class LocationsShard implements IDatabaseShard {
  data: Record<string, Location>;

  constructor() {
    const dir = IO.readDirSync(IO.resolve('database', 'locations'));

    this.data = {};

    for (const file in dir) {
      const map = IO.deserialize(
        IO.readFileSync(IO.resolve('database', 'locations', dir[file])),
      ) as Location;

      this.data[map.Id] = map;
    }
  }
}
