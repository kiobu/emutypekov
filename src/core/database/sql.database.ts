import { IDatabase, DatabaseType } from './database.types';
import { LoggerService } from '../common/util/logger.service';
import { IOService } from '../common/util/io/io.service';
import { ItemDatabase } from './providers/item.database';

export class SQLDatabase implements IDatabase {
  dbType = DatabaseType.SQL;

  // Databases
  items: ItemDatabase;

  // No runtime DI, so we manually instantiate our dependencies.
  logger: LoggerService = new LoggerService();
  io: IOService = new IOService();
  constructor() {
    this.items = new ItemDatabase(this);
    this.logger.log(`Loading SQL database...`);
  }
}
