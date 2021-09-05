import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Location } from './location.types';

@Injectable()
export class LocationService {
  constructor(private readonly database: DatabaseService) {}

  getAllLocations(): Array<Location> {
    return this.database.locationsShard.read();
  }
}
