export interface IShard {
  read(); // Return all data for this shard.
  shardType: ShardType;
}

export enum ShardType {
  Items,
  Customization,
  Bots,
  Locations,
  Profiles,
}
