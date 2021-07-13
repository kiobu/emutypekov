import { Module } from '@nestjs/common';
import { CommonModule } from './common.module';
import { GameModules } from 'src/game/game.modules';

@Module({
  imports: [CommonModule, GameModules],
})
export class CoreModule {}
