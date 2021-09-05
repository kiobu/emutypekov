export interface IShard {
  read(); // Return all data for this shard.
}

export enum ShardType {
  Items,
  Customization,
  Bots,
  Locations,
}
