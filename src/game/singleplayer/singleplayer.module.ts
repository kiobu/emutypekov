import { Module } from '@nestjs/common';
import { SingleplayerController } from './singleplayer.controller';

@Module({
  controllers: [SingleplayerController],
  providers: [],
  exports: [],
  imports: [],
})
export class SingleplayerModule {}
