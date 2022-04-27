import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { CommonModule } from '../common/common.module';
import { DebugModule } from './debug/debug.module';
import { ProfileModule } from 'src/game/profile/profile.module';
import { LauncherController } from './launcher.controller';
import { DatabaseModule } from '../database/database.module';
import * as zlib from 'zlib';

export function ZLibDeflate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  if (typeof original == 'function') {
    descriptor.value = function(...args) {
      var result = original.apply(this, args);
      return zlib.deflateSync(result);
    }
  }
  return descriptor;
}

@Module({
  controllers: [SystemController, LauncherController],
  providers: [SystemService],
  exports: [],
  imports: [CommonModule, DebugModule, ProfileModule, DatabaseModule],
})
export class SystemModule {}
