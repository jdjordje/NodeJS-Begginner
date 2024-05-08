import { PartialType } from "@nestjs/mapped-types";
import { NewCarDto } from "./create-car.dto";

export class UpdateCarDto extends PartialType(NewCarDto) {}