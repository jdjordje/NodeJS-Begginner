import { Injectable, NotFoundException } from "@nestjs/common";
import { Car } from "./eintities/car.entity";
import { CarUpdateDto } from "./dto/update-car.dto";
import { NewCarDto } from "./dto/create-car.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { CarFilter } from "./filters/car-filter.interface";

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}

  // - Retrieving all cars
  getAllCars(filter: CarFilter) {
    const filterConf: FindManyOptions<Car> = {};

    if (filter.make) {
      filterConf.where = { make: filter.make };
    }

    if (filter.year) {
      if (filter.year === `ascending`) filterConf.order = { year: `ASC` };
      if (filter.year === `descending`) filterConf.order = { year: `DESC` };
    }

    return this.carRepo.find(filterConf);
  }

  // - Retrieving a single car by id

  async getCarById(id: number) {
    const foundCar = await this.carRepo.findOneBy({ id });

    if (!foundCar) throw new NotFoundException(`Car not found`);

    return foundCar;
  }

  // - Adding a new car

  async addNewCar(carData: NewCarDto) {
    return this.carRepo.save(carData);
  }

  // - Updating a car by id
  async updateCar(carIdStr: string, updatedCarData: CarUpdateDto) {
    const foundCar = await this.getCarById(Number(carIdStr));

    if (!foundCar) throw new NotFoundException(`Car not found`);

    Object.assign(foundCar, updatedCarData);

    return await this.carRepo.save(foundCar);
  }

  // - Deleting a car by id
  async deleteCar(id: number) {
    const foundCar = await this.getCarById(id);

    if (!foundCar) throw new NotFoundException(`Car not found`);

    await this.carRepo.remove(foundCar);
  }
}
