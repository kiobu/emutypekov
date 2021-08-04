import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  controllers: [SystemController],
  providers: [SystemService],
  exports: [],
  imports: []
})
export class SystemModule { }