import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarInsurance } from "./entities/insurance.entity";
import { CarInsuranceController } from "./insurance.controller";
import { CarInsuranceServices } from "./insurance.services";

@Module({
    imports:[TypeOrmModule.forFeature([CarInsurance])],
    controllers:[CarInsuranceController],
    providers:[CarInsuranceServices],
    
})
export class CarInsuranceModule{}