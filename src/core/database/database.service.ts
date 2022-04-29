import { Injectable, Logger } from '@nestjs/common';
import {
  GlobalsShard,
  ItemsShard,
  LocationsShard,
  ProfilesShard,
} from './shards/shard.types';
import { IO } from '../common/util/io/io.service';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  public itemsShard: ItemsShard;
  public locationsShard: LocationsShard;
  public profilesShard: ProfilesShard;

  public globals: Record<string, any>;

  constructor() {
    this.itemsShard = new ItemsShard();
    this.locationsShard = new LocationsShard();
    this.profilesShard = new ProfilesShard();
    this.globals = new GlobalsShard();

    this.logger.debug('Loaded database');
  }
}
