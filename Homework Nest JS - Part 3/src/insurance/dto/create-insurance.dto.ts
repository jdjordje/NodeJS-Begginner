import { IsString, Length } from "class-validator";
import { Car } from "src/cars/entities/car.entity";

export class CreateInsuranceDto {
  @IsString()
  @Length(0,50)
  policyNumber: string;

  @IsString()
  @Length(5,30)
  provider: string;

  @IsString()
  @Length(5,30)
  coverageDetails: string;
  
  
}
