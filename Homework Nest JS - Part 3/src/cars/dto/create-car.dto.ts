import { IsArray, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";


export class NewCarDto {
  @IsString()
  @MinLength(3)
  make: string;

  @IsString()
  @MinLength(3)
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(2024)
  year: number;

  @IsString()
  carManufacturer: string;

  @IsString()
  carInsurance: string;

  @IsArray()
  @IsOptional()
  carFeature: string[];
}
