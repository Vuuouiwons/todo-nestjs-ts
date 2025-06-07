import { IsString, IsAlphanumeric, IsNotEmpty, Length } from "class-validator";

export class LoginDto {
    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(8, 24)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 24)
    password: string;
}
