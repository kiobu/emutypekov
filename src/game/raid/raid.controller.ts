import { Controller, Get, Param, Post } from '@nestjs/common';
import {
  ITarkovResponse,
  TarkovResponseEmpty,
  TarkovResponseOk,
} from 'src/core/system/response.types';
import { LocationsResponse } from '../location/location.types';
import { LocationService } from '../location/location.service';

@Controller()
export class RaidController {
  readonly loc: LocationService;
  constructor(loc: LocationService) {
    this.loc = loc;
  }

  @Get('client/locations')
  client_locations(): ITarkovResponse<LocationsResponse> {
    return new TarkovResponseOk(this.loc.getLocationsResponse());
  }
}
