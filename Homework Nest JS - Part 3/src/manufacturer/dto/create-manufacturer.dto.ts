import { IsString, Length } from "class-validator";

export class CreateManufacturerDto{
    @IsString()
    @Length(2,30)
    name: string;

    @IsString()
    @Length(2,30)
    headquarters: string;
}