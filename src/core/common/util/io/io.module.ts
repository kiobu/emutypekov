import { Global, Module } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';

@Global()
@Module({
  providers: [IO],
  exports: [IO],
})
export class IOModule {}
