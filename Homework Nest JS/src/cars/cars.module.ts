import { Module } from "@nestjs/common";
import { CarsController } from "./cars.controller";
import { CarsService } from "./cars.services";

@Module({
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
