import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import * as fs from 'fs';

// This is where we will load the items DB from json file.
@Injectable()
export class JSONShard {
  readonly data: any;

  constructor(path: fs.PathLike) {
    this.data = IO.deserialize(IO.readFileSync(path));
  }
}
