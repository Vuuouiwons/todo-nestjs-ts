import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTodolistDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 24)
    title: string;
}
