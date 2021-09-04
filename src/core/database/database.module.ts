import { DynamicModule, Global, Module } from '@nestjs/common';
import { IOModule } from '../common/util/io/io.module';

import { SQLDatabaseService } from './sql.database.service';
import { JSONDatabaseService } from './json.database.service';

import * as config from 'configs/server.json';
import { DatabaseService } from './database.service';

@Global()
@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    if (config.useDatabase === 'json') {
      console.log('Using JSON.');
      return {
        module: DatabaseModule,
        imports: [IOModule],
        // eslint-disable-next-line prettier/prettier
        providers: [{ provide: DatabaseService, useClass: JSONDatabaseService }],
        exports: [DatabaseService],
      };
    } else {
      console.log('Using SQL.');
      return {
        module: DatabaseModule,
        imports: [IOModule],
        providers: [{ provide: DatabaseService, useClass: SQLDatabaseService }],
        exports: [DatabaseService],
      };
    }
  }
}
