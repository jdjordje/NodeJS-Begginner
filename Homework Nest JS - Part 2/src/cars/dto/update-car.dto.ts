import { IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class CarUpdateDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  make: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(2024)
  @IsOptional()
  year: number;
}
