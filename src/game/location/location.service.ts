import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Location } from './location.types';

@Injectable()
export class LocationService {
  private readonly locationsObject: Record<string, Location> = {};
  constructor() {
    const dir = IO.readDirSync(IO.resolve('database', 'locations'));

    for (const file in dir) {
      const map = IO.deserialize(
        IO.readFileSync(IO.resolve('database', 'locations', dir[file])),
      ) as Location;

      this.locationsObject[map.Id] = map;
    }
  }

  getLocationsArray(): Array<Location> {
    const locations = [];

    for (const map in this.locationsObject) {
      locations.push(this.locationsObject[map]);
    }

    return locations;
  }
}
