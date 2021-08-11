import { Module } from '@nestjs/common';
import { LocationModule } from '../location/location.module';
import { RaidController } from './raid.controller';

@Module({
  controllers: [RaidController],
  providers: [],
  exports: [],
  imports: [LocationModule],
})
export class RaidModule {}
