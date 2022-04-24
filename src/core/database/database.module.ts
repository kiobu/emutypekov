import { Module } from '@nestjs/common';
import { IOModule } from '../common/util/io/io.module';

import { DatabaseService } from './database.service';

@Module({
  imports: [IOModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
