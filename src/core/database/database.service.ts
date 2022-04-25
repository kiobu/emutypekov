import { Injectable, Logger } from '@nestjs/common';
import { ItemsShard, LocationsShard, ProfilesShard } from './shards/shard.types';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  public itemsShard: ItemsShard;
  public locationsShard: LocationsShard;
  public profilesShard: ProfilesShard;

  constructor() {
    this.itemsShard = new ItemsShard();
    this.locationsShard = new LocationsShard();
    this.profilesShard = new ProfilesShard();

    this.logger.debug('Loaded database');
  }
}
