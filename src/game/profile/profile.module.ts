import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { IOModule } from "src/core/common/util/io/io.module";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [IOModule]
})
export class ProfileModule {}
