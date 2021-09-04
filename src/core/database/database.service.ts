import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class DatabaseService {
  readonly itemsShard;
}
