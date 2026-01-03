import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

import { CreateTodolistDto } from './create-todolist.dto';

export class UpdateTodolistDto extends PartialType(CreateTodolistDto) {
    @IsString()
    @IsNotEmpty()
    @Length(8, 24)
    title?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
