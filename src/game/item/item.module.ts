import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { IOModule } from 'src/core/common/util/io/io.module';

// All the game modules.
@Module({
  providers: [ItemService],
  imports: [IOModule],
  exports: [ItemService],
})
export class ItemModule {}
