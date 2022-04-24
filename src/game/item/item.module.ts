import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { IOModule } from 'src/core/common/util/io/io.module';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/core/database/database.module';

// All the game modules.
@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [IOModule, DatabaseModule],
  exports: [ItemService],
})
export class ItemModule {}
