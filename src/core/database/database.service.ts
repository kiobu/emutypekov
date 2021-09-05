import { Injectable } from '@nestjs/common';
import { IShard } from './shards/shard.types';

@Injectable()
export abstract class DatabaseService {
  readonly itemsShard: IShard;
  readonly locationsShard: IShard;
  readonly profilesShard: IShard;
}
