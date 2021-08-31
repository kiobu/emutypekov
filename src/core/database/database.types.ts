import { LoggerService } from '../common/util/logger.service';

export enum DatabaseType {
  SQL = 'sql',
  JSON = 'json',
}

export interface IDatabase {
  readonly dbType: DatabaseType;
}
