import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { CommonModule } from '../common/common.module';
import { DebugModule } from './debug/debug.module';
import { ProfileModule } from 'src/game/profile/profile.module';
import { LauncherController } from './launcher.controller';
import { DatabaseModule } from '../database/database.module';
@Module({
  controllers: [SystemController, LauncherController],
  providers: [SystemService],
  exports: [],
  imports: [CommonModule, DebugModule, ProfileModule, DatabaseModule],
})
export class SystemModule {}
