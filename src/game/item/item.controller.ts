import { Controller, Post, Get } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { ItemService } from './item.service';
import { Item, ItemID } from './item.types';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('client/items')
  client_items(): ITarkovResponse<Record<ItemID, Item<unknown>>> {
    return new TarkovResponseOk(
      this.itemService.getItemsRecord() as Record<ItemID, Item<unknown>>,
    );
  }
}
