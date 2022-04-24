import { Controller, Post, Get } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { ItemService } from './item.service';
import { IItem, ItemID } from './item.types';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('client/items')
  client_items(): ITarkovResponse<Record<ItemID, IItem<unknown>>> {
    return new TarkovResponseOk(this.itemService.getAllItems());
  }
}
