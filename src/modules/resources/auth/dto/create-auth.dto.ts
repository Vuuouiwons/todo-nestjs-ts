import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsNotEmpty, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty({ example: 'foo_bar', description: 'Any username' })
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

    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    @IsEmail({}, { message: 'invalid email address' })
    @IsNotEmpty({ message: 'email is required' })
    email: string;

    @ApiProperty({ example: 'T3sting!', description: 'password must include uppercase, lowercase, number, special character, and no spaces', minLength: 8, maxLength: 128 })
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
    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    @IsEmail({}, { message: 'invalid email address' })
    @IsNotEmpty({ message: 'email is required' })
    email: string;

    @ApiProperty({ example: 'T3sting!', description: 'password must include uppercase, lowercase, number, special character, and no spaces', minLength: 8, maxLength: 128 })
    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    @MinLength(8, { message: 'password must be at least 8 characters' })
    @MaxLength(128, { message: 'password must be at most 128 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-])[^\s]+$/, {
        message:
            'password must include uppercase, lowercase, number, special character, and no spaces',
    })
    password: string
}