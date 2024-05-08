import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CarsService } from "./cars.services";
import { CarUpdateDto } from "./dto/update-car.dto";
import { NewCarDto } from "./dto/create-car.dto";
import { CarFilter } from "./filters/car-filter.interface";
import { AddFeatureDto } from "./dto/add-feature.dto";
import { AuthGuard } from "src/auth/auth.guard";


@Controller(`cars`)
export class CarsController {
  constructor(private carService: CarsService) {}

  //retrieving all cars
  @Get()
  getAllCars(@Query(`car`) make: string, @Query(`year`) year: `ascending` | `descending`) {
    const filter: CarFilter = {
      make,
      year,
    };
    return this.carService.getAllCars(filter);
  }

  // - Retrieving a single car by id

  @Get(`:id`)
  getCarById(@Param(`id`) carId: string) {
    return this.carService.getCarById(carId);
  }

  // - Adding a new car
  @Post()
  @HttpCode(HttpStatus.CREATED)
  addNewCar(@Body() carData: NewCarDto) {
    return this.carService.addNewCar(carData);
  }

  //Adding feature to a car
  @Patch(`:id/features`)
  addFeatureToCar(@Param(`id`) carId: string, @Body() featureId: AddFeatureDto) {
    return this.carService.addFeatureToCar(carId, featureId);
  }
  //Get all features from one Car
  @Get(`:id/features`)
  getAllFeaturesFromCar(@Param(`id`) id: string) {
    return this.carService.getAllFeaturesFromCar(id);
  }

  // - Updating a car by id
  @Patch(`:id`)
  updateCar(@Param(`id`) carId: string, @Body() updateCarData: CarUpdateDto) {
    return this.carService.updateCar(carId, updateCarData);
  }

  //Getting details for all cars
  @Get(`details`)
  getAllCarsDetails() {
    return this.carService.getAllCarDetail();
  }

   //remove a feature from a car

   @Delete(`:id/features/:featureId`)
   removeFeatureFromCar(
    @Param(`id`) id:string,@Param(`featureId`) featureId:string){
      return this.carService.removeFeatureFromCar(id,featureId)
    }

  // - Deleting a car by id
  @Delete(`:id`)
  deleteCar(@Param(`id`) carId: string) {
    return this.carService.deleteCar(carId);
  }
}
