import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CarsService } from "./cars.services";
import { Car } from "./interfaces/car.interfaces";
import { CarUpdateDTO } from "./dto/cars-update.dto";
import { newCarDTO } from "./dto/new-car.dto";

@Controller(`cars`)
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carService.getAllCars();
  }

  @Get(`:id`)
  getCarById(@Param(`id`) carId: string) {
    return this.carService.getCarById(carId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addNewCar(@Body() carData: newCarDTO) {
    return this.carService.addNewCar(carData);
  }

  @Patch(`:id`)
  updateCar(@Param(`id`) carId: string, @Body() updateCarData: CarUpdateDTO) {
    return this.carService.updateCar(carId, updateCarData);
  }

  @Delete(`:id`)
  deleteCar(@Param(`id`) carId: string) {
    return this.carService.deleteCar(carId);
  }
}
