import { Module } from '@nestjs/common';
import { IOModule } from 'src/core/common/util/io/io.module';
import { DatabaseModule } from 'src/core/database/database.module';
import { LocationService } from './location.service';

// All the game modules.
@Module({
  providers: [LocationService],
  imports: [IOModule, DatabaseModule],
  exports: [LocationService],
})
export class LocationModule {}
