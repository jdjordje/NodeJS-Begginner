import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CarsManufacturerServices } from "./manufacturer.services";
import { CreateManufacturerDto } from "./dto/create-manufacturer.dto";
import { AuthGuard } from "src/auth/auth.guard";


@Controller(`manufacturer`)
export class CarManufacturerController {
  constructor(private carManufacturerService: CarsManufacturerServices) {}
 
  @Get()
  getAllManufacturers() {
    return this.carManufacturerService.getAllManufacturers();
  }

  @Get(`:id`)
  findManufacturerById(@Param(`id`) id: string){
    return this.carManufacturerService.findManufacturerById(id)
  }

  @Post()
  createNewManufacturer(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.carManufacturerService.createManufacturer(createManufacturerDto);
  }
}
