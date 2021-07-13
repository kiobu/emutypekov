import { Controller, Get } from '@nestjs/common';
import { LoggerService } from 'src/core/util/logger.service';
import { TarkovResponse, ResponseOk } from './system.types';

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
  debug(): TarkovResponse {
    return new ResponseOk({ dummykey: 'dummyvalue' });
  }
}
