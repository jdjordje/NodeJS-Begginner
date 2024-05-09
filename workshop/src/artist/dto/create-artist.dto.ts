import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  stageName: string;
  @IsNumber()
  age: number;
}
