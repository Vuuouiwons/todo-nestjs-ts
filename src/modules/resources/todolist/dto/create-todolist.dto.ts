import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { ApiProperty } from '@nestjs/swagger';

export class CreateTodolistDto {
    @ApiProperty({ example: 'i am todolist title', description: 'Title for todolist' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'false', description: 'Todolist status' })
    @IsOptional()
    status: boolean;
}
