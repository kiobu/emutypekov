import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { CommonModule } from '../common/common.module';
import { DebugModule } from './debug/debug.module';
import { ProfileModule } from 'src/game/profile/profile.module';

@Module({
  controllers: [SystemController],
  providers: [SystemService],
  exports: [],
  imports: [CommonModule, DebugModule, ProfileModule],
})
export class SystemModule {}
