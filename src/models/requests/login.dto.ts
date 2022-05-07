import { Allow, IsNotEmpty, IsString } from "class-validator";

/**
 * Login DTO
 */
export class LoginDto {
    @Allow()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
