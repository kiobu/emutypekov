import { Injectable } from '@nestjs/common';
import { assert } from 'console';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class IO {
  static resolve = path.resolve;
  static isDir(input: fs.PathLike) {
    return fs.lstatSync(input).isDirectory();
  }
  static readDirSync(input: fs.PathLike): string[] {
    assert(fs.lstatSync(input).isDirectory());
    return fs.readdirSync(input);
  }
  static readFileSync(input: fs.PathLike): string {
    assert(fs.lstatSync(input).isFile());
    return fs.readFileSync(input, 'utf-8');
  }
  static writeFileSync(input: fs.PathLike, data: any): void {
    return fs.writeFileSync(input, data, 'utf-8');
  }
  static exists(input: fs.PathLike): boolean {
    return fs.existsSync(input);
  }
  static deserialize(input: string): Record<string, unknown> {
    return JSON.parse(input);
  }
  static serialize(input: Record<string, unknown>): string {
    return JSON.stringify(input);
  }
}
