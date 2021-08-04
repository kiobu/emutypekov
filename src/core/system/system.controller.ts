import { Controller, Get } from '@nestjs/common';
import { assert } from 'console';
import { LoggerService } from 'src/core/util/logger.service';
import { ITarkovResponse, TarkovResponseErr, TarkovResponseOk } from './system.types';

@Controller()
export class SystemController {
  constructor(logger: LoggerService) {
    logger.log('Started system controller.');
  }

  @Get('/')
  index(): string {
    return 'Hello world!';
  }

  @Get('debug')
  debug(): ITarkovResponse<any> {
    try {
      return new TarkovResponseOk<string>("Success response.")
    } catch (_) {
      return new TarkovResponseErr("Failure response.")
    }
  }
}
