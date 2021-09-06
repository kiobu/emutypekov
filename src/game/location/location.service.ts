import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { Location } from './location.types';

@Injectable()
export class LocationService {
  private readonly locations: Array<Location>;
  constructor(private readonly database: DatabaseService) {
    this.locations = this.database.locationsShard.read()['Locations'];
  }

  getAllLocations(): Array<Location> {
    return this.locations;
  }
}
