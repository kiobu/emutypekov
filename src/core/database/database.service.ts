import { Injectable } from '@nestjs/common';
import { IDatabase, DatabaseType } from './database.types';
import { JSONDatabase } from './json.database';
import { SQLDatabase } from './sql.database';
import { CommonService } from '../common/common.service';
import { LoggerService } from '../common/util/logger.service';

@Injectable()
export class MasterDatabaseService {
  database: IDatabase;
  logger: LoggerService;

  loadDatabase<T extends IDatabase>(db: T): void {
    this.database = db;
    this.logger.success(`Loaded database type ${db.dbType}`);
  }

  constructor(common: CommonService, logger: LoggerService) {
    this.logger = logger;

    // eslint-disable-next-line prettier/prettier
    const databaseType: DatabaseType = common.serverConfig.dbType as DatabaseType;

    if (databaseType === DatabaseType.JSON) {
      this.loadDatabase<JSONDatabase>(new JSONDatabase());
    } else if (databaseType === DatabaseType.SQL) {
      this.loadDatabase<SQLDatabase>(new SQLDatabase());
    } else {
      logger.error('Unknown database type.');
    }
  }
}
