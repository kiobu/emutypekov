import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Item, ItemID } from './item.types';

/************************************************************************
TODO: Rewrite to use interface instead of IOService for SQL and JSON dbs.
*************************************************************************/
@Injectable()
export class ItemService {
  private readonly items: Record<ItemID, Item<any>>;
  constructor() {
    this.items = IO.deserialize(
      IO.readFileSync(IO.resolve('database', 'items', 'items.json')),
    ) as Record<ItemID, Item<any>>;
  }

  getItems(): Record<ItemID, Item<any>> {
    return this.items;
  }
}
