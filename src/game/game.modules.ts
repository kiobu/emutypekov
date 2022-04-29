import { Module } from '@nestjs/common';

import { LocationModule } from './location/location.module';
import { ProfileModule } from './profile/profile.module';
import { RaidModule } from './raid/raid.module';
import { ItemModule } from './item/item.module';
import { LocaleModule } from './locales/locale.module';
import { SingleplayerModule } from './singleplayer/singleplayer.module';

// All the game modules.
@Module({
  imports: [
    ItemModule,
    RaidModule,
    LocationModule,
    ProfileModule,
    LocaleModule,
    SingleplayerModule,
  ],
})
export class GameModules {}
