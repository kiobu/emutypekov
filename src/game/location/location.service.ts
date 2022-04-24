import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Location } from './location.types';
import { DatabaseService } from 'src/core/database/database.service';
import { LocationsShard } from 'src/core/database/shards/shard.types';

@Injectable()
export class LocationService {
  private readonly locations: LocationsShard;
  constructor(private readonly databaseService: DatabaseService) {
    this.locations = databaseService.locationsShard;
  }

  getLocationsArray(): Array<Location> {
    const locations = [];

    for (const map in this.locations.data) {
      locations.push(this.locations.data[map]);
    }

    return locations;
  }
}
