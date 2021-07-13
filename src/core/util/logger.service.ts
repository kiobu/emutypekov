import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly _logger = new Logger(LoggerService.name);

  log(message) {
    this._logger.log(message);
  }
}
