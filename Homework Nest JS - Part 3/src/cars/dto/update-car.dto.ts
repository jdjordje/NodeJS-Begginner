import { PartialType } from "@nestjs/mapped-types";
import { NewCarDto } from "./create-car.dto";

export class CarUpdateDto extends PartialType(NewCarDto) {}