import { Injectable } from "@nestjs/common";
import { LoggerService } from "../util/logger.service";
import { CommonService } from "../common/common.service";

@Injectable()
export class SystemService {
  constructor(private logger: LoggerService, private common: CommonService) { 
    
  }
}