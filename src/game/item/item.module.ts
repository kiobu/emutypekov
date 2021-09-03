import { Module } from '@nestjs/common';
import { IOModule } from 'src/core/common/util/io/io.module';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/core/database/database.module';

// All the game modules.
@Module({
  controllers: [ItemController],
  imports: [IOModule, DatabaseModule],
})
export class ItemModule {}
