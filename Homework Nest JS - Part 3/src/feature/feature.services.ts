import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarFeature } from "./entities/feature.entity";
import { Repository } from "typeorm";
import { NewCarFeatureDto } from "./dto/create-feature.dto";

@Injectable()
export class CarFeatureServices {
  constructor(@InjectRepository(CarFeature) private carFeatureRepo: Repository<CarFeature>) {}

  getAllFeatures() {
    return this.carFeatureRepo.find();
  }

  async findFeatureById(id: string) {
    const findFeature = await this.carFeatureRepo.findOneByOrFail({ id });

    if (!findFeature) throw new NotFoundException(`Feature not found`);

    return findFeature;
  }

  async createFeature(createFeatureDto: NewCarFeatureDto) {
    return await this.carFeatureRepo.save(createFeatureDto);
  }

  
}
