import { Injectable } from '@nestjs/common';
import { JSONShard } from './shards/json.shard';
import { ShardType } from './shards/shard.types';

@Injectable()
export class JSONDatabaseService {
  // eslint-disable-next-line prettier/prettier
  readonly itemsShard: JSONShard = new JSONShard(ShardType.Items, './database/items/items.json');
  // eslint-disable-next-line prettier/prettier
  readonly locationsShard: JSONShard = new JSONShard(ShardType.Locations, './database/locations/');
}
