import { Module } from '@nestjs/common';
import { ItemDatabase } from './providers/item.database';
import { LocationDatabase } from './providers/location.database';
import { IOModule } from '../common/util/io/io.module';

// All the game modules.
@Module({
  providers: [ItemDatabase, LocationDatabase],
  imports: [IOModule],
  exports: [],
})
export class DatabaseModule {}
