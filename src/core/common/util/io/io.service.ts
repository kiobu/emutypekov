import { Injectable } from '@nestjs/common';
import { assert } from 'console';
import * as fs from 'fs';
import * as path from 'path';

export type Path = fs.PathLike;

@Injectable()
export class IO {
  static resolve = path.resolve;
  static isDir(input: Path) {
    return fs.lstatSync(input).isDirectory();
  }
  static readDirSync(input: Path): string[] {
    assert(fs.lstatSync(input).isDirectory());
    return fs.readdirSync(input);
  }
  static readFileSync(input: Path): string {
    assert(fs.lstatSync(input).isFile());
    return fs.readFileSync(input, 'utf-8');
  }
  static writeFileSync(input: Path, data: any): void {
    return fs.writeFileSync(input, data, 'utf-8');
  }
  static mkdirSync(input: Path): void {
    return fs.mkdirSync(input);
  }
  static exists(input: Path): boolean {
    return fs.existsSync(input);
  }
  static deserialize(input: string): any {
    return JSON.parse(input);
  }
  static serialize(input: any): string {
    return JSON.stringify(input);
  }

  static cleanString(s: string): any {
    return s
      .replace(/[\b]/g, '')
      .replace(/[\f]/g, '')
      .replace(/[\n]/g, '')
      .replace(/[\r]/g, '')
      .replace(/[\t]/g, '')
      .replace(/[\\]/g, '');
  }
}
