import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { GameModules } from 'src/game/game.modules';

/*
* The module that contains all game data.
*/

@Module({
  imports: [CommonModule, GameModules],
})
export class CoreModule {}
