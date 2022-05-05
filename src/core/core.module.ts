import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { CommonModule } from './common/common.module';
import { GameModules } from 'src/game/game.modules';
import { EventEmitterModule } from '@nestjs/event-emitter';

/*
 * The module that contains all game data.
 */

@Module({
  imports: [SystemModule, CommonModule, GameModules],
})
export class CoreModule {}
