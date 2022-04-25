import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Location } from './location.types';
import { DatabaseService } from 'src/core/database/database.service';
import { LocationsShard } from 'src/core/database/shards/shard.types';

@Injectable()
export class LocationService {
  private readonly locations: Record<string, Location>;
  constructor(private readonly databaseService: DatabaseService) {
    this.locations = databaseService.locationsShard.data;
  }

  getLocationsArray(): Array<Location> {
    const locations = [];

    for (const map in this.locations) {
      locations.push(this.locations[map]);
    }

    return locations;
  }
}
