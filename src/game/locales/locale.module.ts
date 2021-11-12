import { Module } from '@nestjs/common';
import { IOModule } from 'src/core/common/util/io/io.module';
import { LocaleController } from './locale.controller';
import { LocaleService } from './locale.service';

// All the game modules.
@Module({
  providers: [LocaleService],
  imports: [IOModule],
  exports: [LocaleService],
  controllers: [LocaleController],
})
export class LocaleModule {}
