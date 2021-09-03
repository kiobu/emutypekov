import { IDatabase } from '../database.types';
import { ItemID, Item } from 'src/game/item/item.types';
import { JSONDatabase } from '../json.database';
import { IOService } from 'src/core/common/util/io/io.service';
import { SQLDatabase } from '../sql.database';

export class ItemDatabase {
  private io: IOService = new IOService();

  private items: Record<ItemID, Item<any>>;

  constructor(master: IDatabase) {
    if (master instanceof JSONDatabase) {
      this.items = this.io.deserialize(
        this.io.readFileSync('./db/items/items.json'),
      ) as Record<ItemID, Item<any>>;
    }
  }

  getItems(): Record<ItemID, Item<any>> {
    return this.items;
  }
}
