import { TypeOrmModule } from "@nestjs/typeorm";
import { CarFeature } from "./entities/feature.entity";
import { Module } from "@nestjs/common";
import { CarsFeaturesController } from "./feature.controller";
import { CarFeatureServices } from "./feature.services";

@Module({
    imports:[TypeOrmModule.forFeature([CarFeature])],
    controllers:[CarsFeaturesController],
    providers:[CarFeatureServices],
    exports:[CarFeatureServices]
})
export class CarFeatureModule{};