import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarManufacturer } from "./entities/manufacturer.entity";
import { CarManufacturerController } from "./manufacturer.controller";
import { CarsManufacturerServices } from "./manufacturer.services";

@Module({
    imports:[TypeOrmModule.forFeature([CarManufacturer])],
    controllers:[CarManufacturerController],
    providers:[CarsManufacturerServices],
    exports:[CarsManufacturerServices]
})
export class CarManufacturerModule{}