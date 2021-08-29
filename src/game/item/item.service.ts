import { Injectable } from '@nestjs/common';
import { Item, ItemID } from './item.types';
import { IOService } from 'src/core/common/util/io/io.service';

/************************************************************************
TODO: Rewrite to use interface instead of IOService for SQL and JSON dbs.
*************************************************************************/
@Injectable()
export class ItemService {
  readonly io: IOService;
  readonly items: Array<Item<any>>;
  // readonly items_response: Record<ItemID, Item>;

  constructor(io: IOService) {
    this.io = io;
  }
}
