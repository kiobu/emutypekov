import { IDatabase, DatabaseType } from './database.types';

export class SQLDatabase implements IDatabase {
  dbType = DatabaseType.SQL;
  constructor() {
    // Load SQL database here.
  }
}
