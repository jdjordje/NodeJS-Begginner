import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { CarsService } from "./cars.services";
import { CarUpdateDto } from "./dto/update-car.dto";
import { NewCarDto } from "./dto/create-car.dto";
import { CarFilter } from "./filters/car-filter.interface";

@Controller(`cars`)
export class CarsController {
  constructor(private carService: CarsService) {}

  @Get()
  getAllCars(@Query(`car`) make: string, @Query(`year`) year: `ascending` | `descending`) {
    const filter: CarFilter = {
      make,
      year,
    };
    return this.carService.getAllCars(filter);
  }

  @Get(`:id`)
  getCarById(@Param(`id`) carId: string) {
    return this.carService.getCarById(Number(carId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addNewCar(@Body() carData: NewCarDto) {
    return this.carService.addNewCar(carData);
  }

  @Patch(`:id`)
  updateCar(@Param(`id`) carId: string, @Body() updateCarData: CarUpdateDto) {
    return this.carService.updateCar(carId, updateCarData);
  }

  @Delete(`:id`)
  deleteCar(@Param(`id`) carId: string) {
    return this.carService.deleteCar(Number(carId));
  }
}
