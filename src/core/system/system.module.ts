import { Module } from '@nestjs/common';
import { CommonService } from '../common/common.service';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';

@Module({
  controllers: [SystemController],
  providers: [SystemService],
  exports: [],
  imports: [CommonService]
})
export class SystemModule { }