import { Module } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';

// All the game modules.
@Module({
  providers: [IO],
  exports: [IO],
})
export class IOModule {}
