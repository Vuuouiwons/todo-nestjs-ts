import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsNotEmpty, MaxLength, Matches } from 'class-validator';

export class SignUpDto {
    @Transform(({ value }) => value?.trim().toLowerCase())
    @IsString()
    @IsNotEmpty({ message: 'username is required' })
    @MinLength(8, {
        message: 'username too short'
    })
    @MaxLength(48, {
        message: 'username too long'
    })
    @Matches(/^[a-z0-9_]+$/, {
        message: 'username can only contain lowercase letters, numbers, and underscores',
    })
    username: string;

    @IsEmail({}, { message: 'invalid email address' })
    @IsNotEmpty({ message: 'email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    @MinLength(8, { message: 'password must be at least 8 characters' })
    @MaxLength(128, { message: 'password must be at most 128 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-])[^\s]+$/, {
        message:
            'password must include uppercase, lowercase, number, special character, and no spaces',
    })
    password: string;
}

export class SignInDto {
    @IsEmail({}, { message: 'invalid email address' })
    @IsNotEmpty({ message: 'email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    @MinLength(12, { message: 'password must be at least 12 characters' })
    @MaxLength(128, { message: 'password must be at most 128 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-])[^\s]+$/, {
        message:
            'password must include uppercase, lowercase, number, special character, and no spaces',
    })
    password: string
}