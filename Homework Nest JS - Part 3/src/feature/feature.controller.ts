import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CarFeatureServices } from "./feature.services";
import { NewCarFeatureDto } from "./dto/create-feature.dto";

import { AuthGuard } from "src/auth/auth.guard";


@Controller(`features`)
export class CarsFeaturesController {
  constructor(private carFeatureServices: CarFeatureServices) {}

  @Get()
  getAllFeatures() {
    return this.carFeatureServices.getAllFeatures();
  }

  @Get(`:id`)
  findFeatureById(@Param(`id`) featureId: string) {
    return this.carFeatureServices.findFeatureById(featureId);
  }

  @Post()
  createFeature(@Body() createFeatureDto: NewCarFeatureDto) {
    return this.carFeatureServices.createFeature(createFeatureDto);
  }
}
