import { Injectable, Logger } from '@nestjs/common';
import {
  GlobalsPartition,
  ItemsPartition,
  LocationsPartition,
  ProfilesPartition,
} from './partitions/partitions.types';
import { IO } from '../common/util/io/io.service';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  public itemsPartition: ItemsPartition;
  public locationsPartition: LocationsPartition;
  public profilesPartition: ProfilesPartition;

  public globals: Record<string, any>;

  constructor() {
    this.itemsPartition = new ItemsPartition();
    this.locationsPartition = new LocationsPartition();
    this.profilesPartition = new ProfilesPartition();
    this.globals = new GlobalsPartition();

    this.logger.debug('Loaded database');
  }
}
