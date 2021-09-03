import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { CommonModule } from './common/common.module';
import { GameModules } from 'src/game/game.modules';
import { DatabaseModule } from './database/database.module';

/*
 * The module that contains all game data.
 */

@Module({
  imports: [DatabaseModule.register(), SystemModule, CommonModule, GameModules],
})
export class CoreModule {}
