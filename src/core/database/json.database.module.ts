import { Module } from '@nestjs/common';
import { IOModule } from '../common/util/io/io.module';
import { JSONShard } from './shards/json.shard';
@Module({
  providers: [JSONShard],
  imports: [IOModule],
  exports: [],
})
export class JSONDatabaseModule {}
