import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsNotEmpty, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
}