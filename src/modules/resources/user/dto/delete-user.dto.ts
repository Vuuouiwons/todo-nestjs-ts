import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteUserDto {
    @ApiProperty({ example: 'foo_bar', description: 'confirmation username to delete account' })
    @IsString()
    username: string;
}