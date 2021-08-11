import { Injectable } from '@nestjs/common';
import { Location, LocationsResponse } from './location.types';
import { IOService } from 'src/core/common/util/io/io.service';

@Injectable()
export class LocationService {
  readonly io: IOService;
  readonly locations: Array<Location>;

  constructor(io: IOService) {
    this.io = io;

    const l: Array<Location> = [];
    this.io.readDirSync('./db/locations/').forEach((file) => {
      l.push(
        this.io.deserialize(
          this.io.readFileSync(`./db/locations/${file}`),
        ) as Location,
      );
    });

    this.locations = l;
  }

  getLocationsResponse(): LocationsResponse {
    const obj = { locations: {} };
    this.locations.forEach((location) => {
      obj.locations[location._Id] = location;
    });
    return obj;
  }
}
