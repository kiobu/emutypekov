import { Injectable } from '@nestjs/common';
import { assert } from 'console';
import * as fs from 'fs';

@Injectable()
export class IOService {
  lstatSync: fs.StatSyncFn<fs.PathLike> = fs.lstatSync;
  readDirSync(input: fs.PathLike): string[] {
    assert(fs.lstatSync(input).isDirectory());
    return fs.readdirSync(input);
  }
  readFileSync(input: fs.PathLike): string {
    assert(fs.lstatSync(input).isFile());
    return fs.readFileSync(input).toString('utf-8');
  }
  deserialize(input: string): Record<string, unknown> {
    return JSON.parse(input);
  }
  serialize(input: Record<string, unknown>): string {
    return JSON.stringify(input);
  }
}
