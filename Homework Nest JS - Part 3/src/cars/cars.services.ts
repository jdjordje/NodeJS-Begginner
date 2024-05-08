import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Car } from "./entities/car.entity";
import { CarUpdateDto } from "./dto/update-car.dto";
import { NewCarDto } from "./dto/create-car.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { CarFilter } from "./filters/car-filter.interface";
import { AddFeatureDto } from "./dto/add-feature.dto";

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

  async getCarById(id: string) {
    const foundCar = await this.carRepo.findOne({
      where: { id },
      relations: { carInsurance: true, carManufacturer: true, carFeature: true },
    });

    if (!foundCar) throw new NotFoundException(`Car not found`);

    return foundCar;
  }

  // - Adding a new car

  async addNewCar(carData: NewCarDto) {
    try {
      const newCar = await this.carRepo.save({
        make: carData.make,
        model: carData.model,
        year: carData.year,
        carManufacturer: { id: carData.carManufacturer },
        carInsurance: { id: carData.carInsurance },
        //car feature adding is optional
        carFeature: carData.carFeature.map((id) => {
          return { id };
        }),
      });

      return newCar;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  //Adding feature to a car
  async addFeatureToCar(carId: string, addFeature: AddFeatureDto) {
    const foundCar = await this.getCarById(carId);

    return await this.carRepo.save({ ...foundCar, carFeature: [{ id: addFeature.newFeature }] });
  }

  //Get all features from one Car

  async getAllFeaturesFromCar(id: string) {
    const foundCar = await this.getCarById(id);
    return foundCar.carFeature;
  }

  // - Updating a car by id
  async updateCar(carIdStr: string, updatedCarData: CarUpdateDto) {
    const foundCar = await this.getCarById(carIdStr);

    if (!foundCar) throw new NotFoundException(`Car not found`);

    Object.assign(foundCar, updatedCarData);

    return await this.carRepo.save(foundCar);
  }

  //Getting details for all cars
  async getAllCarDetail() {
    const allCarDetails = await this.carRepo.find({
      relations: {
        carInsurance: true,
        carManufacturer: true,
        carFeature: true,
      },
    });
    return allCarDetails;
  }

  //remove a feature from a car

  async removeFeatureFromCar(carId: string, featureId: string) {
    const findCar = await this.getCarById(carId);

    if (!findCar) throw new NotFoundException(`Car not Found`);

    findCar.carFeature = findCar.carFeature.filter((feature) => feature.id !== featureId);

    return await this.carRepo.save(findCar);
  }

  // - Deleting a car by id
  async deleteCar(id: string) {
    const foundCar = await this.getCarById(id);

    if (!foundCar) throw new NotFoundException(`Car not found`);

    await this.carRepo.remove(foundCar);
  }
}
