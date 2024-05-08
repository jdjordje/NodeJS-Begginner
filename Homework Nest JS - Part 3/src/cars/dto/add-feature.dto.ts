import { IsString } from "class-validator";

export class AddFeatureDto{
    @IsString()
    newFeature :string;
}