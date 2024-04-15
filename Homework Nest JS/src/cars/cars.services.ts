import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Car } from "./interfaces/car.interfaces";
import { CarUpdateDTO } from "./dto/cars-update.dto";
import { newCarDTO } from "./dto/new-car.dto";

@Injectable()
export class CarsService {
  // - Retrieving all cars
  async getAllCars() {
    const carsJSON = await readFile(join(process.cwd(), "src", "cars", "data", "cars.json"), "utf-8");

    const cars: Car[] = JSON.parse(carsJSON);

    return cars;
  }

  async saveCarList(cars: Car[]) {
    await writeFile(join(process.cwd(), "src", "cars", "data", "cars.json"), JSON.stringify(cars, null, 2), "utf-8");
  }

  // - Retrieving a single car by id

  async getCarById(carIdStr: string) {
    const cars = await this.getAllCars();

    const carId = Number(carIdStr);

    const carFound = cars.find((car) => car.id === carId);

    if (!carFound) throw new NotFoundException(`Car not found!`);

    return carFound;
  }

  // - Adding a new car

  async addNewCar(carData: newCarDTO) {
    const cars = await this.getAllCars();

    const newCar: Car = {
      ...carData,
    };

    const checkExistingId = cars.some((car) => car.id === newCar.id);

    if (checkExistingId) throw new ForbiddenException(`Car Already exist in database with current ID `);

    cars.push(newCar);

    await this.saveCarList(cars);
    return newCar;
  }

  // - Updating a car by id
  async updateCar(carIdStr: string, updatedCarData: CarUpdateDTO) {
    const cars = await this.getAllCars();

    const carId = Number(carIdStr);

    const checkExistingId = cars.some((car) => car.id === carId);

    if (!checkExistingId) throw new NotFoundException(`Car not found!`);

    const newList = cars.map((car) => {
      if (car.id === carId) {
        return { ...car, ...updatedCarData };
      } else {
        return car;
      }
    });
    console.log(newList);
    await this.saveCarList(newList);
  }

  // - Deleting a car by id
  async deleteCar(carIdStr: string) {
    const cars = await this.getAllCars();

    const carId = Number(carIdStr);

    const findingCar = cars.filter((car) => car.id !== carId);

    if (findingCar.length === cars.length) throw new NotFoundException(`Car not found!`);

    await this.saveCarList(findingCar);
  }
}
