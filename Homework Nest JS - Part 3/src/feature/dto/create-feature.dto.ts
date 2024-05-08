import { IsOptional, IsString, Length } from "class-validator";

export class NewCarFeatureDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
