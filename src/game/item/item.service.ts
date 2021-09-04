import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Item, ItemID } from './item.types';

/************************************************************************
TODO: Rewrite to use interface instead of IOService for SQL and JSON dbs.
*************************************************************************/
@Injectable()
export class ItemService {
  constructor(private readonly database: DatabaseService) {}

  getItemsRecord(): Record<string, unknown> {
    return this.database.itemsShard.read();
  }
}
