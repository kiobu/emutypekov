import { Module } from '@nestjs/common';

import { LocationModule } from './location/location.module';
import { ProfileModule } from './profile/profile.module';
import { RaidModule } from './raid/raid.module';
import { ItemModule } from './item/item.module';

// All the game modules.
@Module({
  imports: [ItemModule, RaidModule, LocationModule, ProfileModule],
})
export class GameModules {}
