import { DynamicModule, Global, Module } from '@nestjs/common';
import { IOModule } from '../common/util/io/io.module';

import { SQLDatabaseModule } from './sql.database.module';
import { JSONDatabaseModule } from './json.database.module';

import * as config from 'configs/server.json';

@Global()
@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    if (config.useDatabase === 'json') {
      console.log('Using JSON.');
      return {
        module: JSONDatabaseModule,
        imports: [IOModule],
        providers: [],
      };
    } else {
      console.log('Using SQL.');
      return {
        module: SQLDatabaseModule,
        imports: [IOModule],
        providers: [],
      };
    }
  }
}
