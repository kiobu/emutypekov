import { LoggerService } from '../common/util/logger.service';

export enum DatabaseType {
  SQL = 'sql',
  JSON = 'json',
}

export interface IDatabase {
  logger: LoggerService;
  readonly dbType: DatabaseType;
}

/*************************************************
TODO: Move instanced databases to another provider.
**************************************************/
export class SQLDatabase implements IDatabase {
  dbType: DatabaseType.SQL;
  logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
    // Load SQL database here.
    this.logger.log('Loading SQL database ...');
  }
}

export class JSONDatabase implements IDatabase {
  dbType: DatabaseType.JSON;
  logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
    // Load JSON database here.
    this.logger.log('Loading JSON database ...');
  }
}
