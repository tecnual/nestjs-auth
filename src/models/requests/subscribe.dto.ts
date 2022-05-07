import { Allow, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SubscribeDTO {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
