import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CarInsuranceServices } from "./insurance.services";
import { CreateInsuranceDto } from "./dto/create-insurance.dto";



@Controller(`insurance`)
export class CarInsuranceController{
    constructor(private carInsuranceServices: CarInsuranceServices){}

    @Get()
    getAllInsurances(){
        return this.carInsuranceServices.getAllInsurances()
    }

    @Get(`:id`)
    findInsuranceById(@Param(`id`) insuranceId: string){
        return this.carInsuranceServices.findInsuranceById(insuranceId)
    }

    @Post()
    createInsurance(@Body() createInsuraceDto: CreateInsuranceDto){
        return this.carInsuranceServices.createInsurance(createInsuraceDto)
    }
    
}