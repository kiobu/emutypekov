import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { RaidModule } from './raid/raid.module';

// All the game modules.
@Module({ 
    imports: [RaidModule, LocationModule] 
})
export class GameModules {}
