import { Injectable, Logger } from '@nestjs/common';
import { ItemsShard, LocationsShard } from './shards/shard.types';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  public itemsShard: ItemsShard;
  public locationsShard: LocationsShard;

  constructor() {
    this.itemsShard = new ItemsShard();
    this.locationsShard = new LocationsShard();

    this.logger.debug('Loaded database');
  }
}
