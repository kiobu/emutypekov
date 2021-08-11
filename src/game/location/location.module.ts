import { Module } from '@nestjs/common';
import { IOModule } from 'src/core/common/util/io/io.module';
import { LocationService } from './location.service';

// All the game modules.
@Module({
  providers: [LocationService],
  imports: [IOModule],
  exports: [LocationService],
})
export class LocationModule {}
