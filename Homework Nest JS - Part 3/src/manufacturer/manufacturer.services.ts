import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarManufacturer } from "./entities/manufacturer.entity";
import { Repository } from "typeorm";
import { CreateManufacturerDto } from "./dto/create-manufacturer.dto";

@Injectable()
export class CarsManufacturerServices{
    constructor(@InjectRepository(CarManufacturer) private carManufacturerRepo:Repository<CarManufacturer>){}

    getAllManufacturers(){
        return this.carManufacturerRepo.find()
    }

    async findManufacturerById(id: string) {
        const findManufacturer = await this.carManufacturerRepo.findOneByOrFail({ id });
    
        if (!findManufacturer) throw new NotFoundException(`Manufacturer not found`);
    
        return findManufacturer;
      }

    async createManufacturer(createManufacturerDto: CreateManufacturerDto){
        const newManufacturer = await this.carManufacturerRepo.save(createManufacturerDto);
        return newManufacturer;
    }



}