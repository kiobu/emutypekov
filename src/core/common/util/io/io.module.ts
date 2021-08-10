import { Module } from '@nestjs/common';
import { IOService } from 'src/core/common/util/io/io.service';

// All the game modules.
@Module({ 
    providers: [IOService],
    exports: [IOService],
})
export class IOModule {}
