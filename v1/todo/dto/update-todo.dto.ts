import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @Length(0, 255)
    message: string

    @IsBoolean()
    @IsOptional()
    @IsNotEmpty()
    status: boolean
}
