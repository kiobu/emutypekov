import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ItemDatabase } from './providers/item.database';
import { LocationDatabase } from './providers/location.database';
import { IOModule } from '../common/util/io/io.module';
import { CommonModule } from '../common/common.module';
import { JSONDatabase } from './json.database';
import { SQLDatabase } from './sql.database';

// All the game modules.
@Module({
  providers: [DatabaseService, ItemDatabase, LocationDatabase, JSONDatabase, SQLDatabase],
  imports: [IOModule, CommonModule],
  exports: [DatabaseService, ItemDatabase, LocationDatabase],
})
export class DatabaseModule {}
