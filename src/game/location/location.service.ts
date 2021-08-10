import { Injectable } from "@nestjs/common";
import { Location } from "./location.types";
import { IOService } from "src/core/common/util/io/io.service";

@Injectable()
export class LocationService {
    readonly io: IOService
    readonly locations: Array<Location>

    constructor(io: IOService) {
        this.io = io;
    }

    getLocations(): Array<Location> {
        let l: Array<Location> = []
        this.io.readDirSync('./db/locations/').forEach(file => {
            l.push(this.io.deserialize(this.io.readFileSync(`./db/locations/${file}`)) as Location);
        })
        return l;

    }
    getLocationsResponse() {
        let obj = {"locations": {}}
        this.getLocations().forEach(location => {
            obj.locations[location._Id] = location
        })
        return obj;
    }
}