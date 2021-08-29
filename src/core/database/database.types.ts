export enum DatabaseType {
  SQL = 'sql',
  JSON = 'json',
}

export interface IDatabase {
  readonly dbType: DatabaseType;
}

export class SQLDatabase implements IDatabase {
  dbType: DatabaseType.SQL;
}

export class JSONDatabase implements IDatabase {
  dbType: DatabaseType.JSON;
}
