import { Controller, Get, Param, Post } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location.types';
import { TarkovID } from '../item/item.types';

@Controller()
export class RaidController {
  constructor(private readonly locations: LocationService) {}

  @Get('client/locations')
  client_locations(): ITarkovResponse<Record<TarkovID, Location>> {
    const obj = { locations: {} };

    this.locations.getAllLocations().forEach((location) => {
      obj.locations[location._Id] = location;
    });

    return new TarkovResponseOk(obj);
  }
}
