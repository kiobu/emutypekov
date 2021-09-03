import { Controller, Post, Get } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { ItemID, Item } from './item.types';
import { MasterDatabaseService } from 'src/core/database/database.service';

@Controller()
export class ItemController {
  readonly db: MasterDatabaseService;

  constructor(db: MasterDatabaseService) {
    this.db = db;
  }

  @Get('client/items')
  client_items(): ITarkovResponse<Record<ItemID, Item<any>>> {
    const res = this.db.database.items.getItems();

    return new TarkovResponseOk(res);
  }
}
