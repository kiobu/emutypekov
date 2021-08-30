import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ItemDatabase } from './providers/item.database';
import { LocationDatabase } from './providers/location.database';
import { IOModule } from '../common/util/io/io.module';
import { CommonModule } from '../common/common.module';

// All the game modules.
@Module({
  providers: [DatabaseService, ItemDatabase, LocationDatabase],
  imports: [IOModule, CommonModule],
  exports: [],
})
export class DatabaseModule {}
