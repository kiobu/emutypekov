import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { IItem, ItemID } from './item.types';
import { DatabaseService } from 'src/core/database/database.service';
import { ItemsShard } from 'src/core/database/shards/shard.types';

@Injectable()
export class ItemService {
  private readonly items: Record<ItemID, IItem<any>>;
  constructor(private readonly databaseService: DatabaseService) {
    this.items = databaseService.itemsShard.data;
  }

  getAllItems(): Record<ItemID, IItem<any>> {
    return this.items;
  }

  getItemByID(id: ItemID): IItem<any> {
    return this.items[id] || null;
  }
}
