import { Injectable } from '@nestjs/common';
import { Location, LocationsResponse } from './location.types';
import { IO } from 'src/core/common/util/io/io.service';

/************************************************************************
TODO: Rewrite to use interface instead of IOService for SQL and JSON dbs.
*************************************************************************/
@Injectable()
export class LocationService {
  readonly io: IO;
  readonly locations: Array<Location>;

  constructor() {
    const l: Array<Location> = [];
    IO.readDirSync('./db/locations/').forEach((file) => {
      l.push(
        IO.deserialize(IO.readFileSync(`./db/locations/${file}`)) as Location,
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
