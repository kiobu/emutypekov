import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly _logger = new Logger(LoggerService.name);

  log(message) {
    this._logger.log(`[LOG]: ${message}`);
  }

  success(message) {
    this._logger.log(`[SUCCESS]: ${message}`);
  }

  error(message) {
    this._logger.log(`[ERROR]: ${message}`);
  }
}
