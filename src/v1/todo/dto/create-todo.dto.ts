import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    message: string
}
