import { Injectable } from "@nestjs/common";
import * as config from 'configs/server.json'

@Injectable()
export class CommonService {
    readonly serverConfig = config;
}