import { IDatabase, DatabaseType } from './database.types';
import { LoggerService } from '../common/util/logger.service';
import { IOService } from '../common/util/io/io.service';

export class JSONDatabase implements IDatabase {
  dbType = DatabaseType.JSON;
  constructor(logger: LoggerService, io: IOService) {
    logger.log(`Doing something...`)
  }
}
