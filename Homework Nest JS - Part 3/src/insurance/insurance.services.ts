import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarInsurance } from "./entities/insurance.entity";
import { Repository } from "typeorm";
import { CreateInsuranceDto } from "./dto/create-insurance.dto";

@Injectable()
export class CarInsuranceServices{
    constructor(@InjectRepository(CarInsurance) private carInsurance: Repository<CarInsurance>){}

    getAllInsurances(){
        return this.carInsurance.find()
    }

    async findInsuranceById(id: string) {
        const findInsurance = await this.carInsurance.findOneByOrFail({ id });
    
        if (!findInsurance) throw new NotFoundException(`Insurance not found`);
    
        return findInsurance;
      }

    async createInsurance(createInsuranceDto: CreateInsuranceDto ){
        return await this.carInsurance.save(createInsuranceDto)
    }
}