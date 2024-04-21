import { IsNumber, IsString, Length, Max, Min, MinLength } from "class-validator";

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
}
