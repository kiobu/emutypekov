import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Item, ItemID } from './item.types';

/************************************************************************
TODO: Rewrite to use interface instead of IOService for SQL and JSON dbs.
*************************************************************************/
@Injectable()
export class ItemService {
  private readonly items: Record<ItemID, Item<any>>;
  constructor(private readonly database: DatabaseService) {
    this.items = this.database.itemsShard.read()['Items'];
  }

  getItemsRecord(): Record<string, unknown> {
    return this.items;
  }
}
