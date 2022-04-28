import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { CommonModule } from '../common/common.module';
import { DebugModule } from './debug/debug.module';
import { ProfileModule } from 'src/game/profile/profile.module';
import { LauncherController } from './launcher.controller';
import { DatabaseModule } from '../database/database.module';
import * as zlib from 'zlib';
import { LauncherService } from './launcher.service';

@Module({
  controllers: [SystemController, LauncherController],
  providers: [SystemService, LauncherService],
  exports: [],
  imports: [CommonModule, DebugModule, ProfileModule, DatabaseModule],
})
export class SystemModule {}
