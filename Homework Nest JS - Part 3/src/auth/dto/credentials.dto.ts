import { IsEmail, IsString } from "class-validator";

export class Credentials{
    @IsEmail()
    email:string;

    @IsString()
    pasword:string;
}