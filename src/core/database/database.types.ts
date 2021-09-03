import { ItemDatabase } from './providers/item.database';

export enum DatabaseType {
  SQL = 'sql',
  JSON = 'json',
}

export interface IDatabase {
  readonly dbType: DatabaseType;
  readonly items: ItemDatabase;
}
