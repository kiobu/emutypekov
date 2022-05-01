import { Module } from "@nestjs/common";
import { ModsService } from "./mods.service";

@Module({
  providers: [ModsService],
  controllers: [],
  imports: [],
  exports: [],
})
export class ModsModule {
  constructor() {}
}