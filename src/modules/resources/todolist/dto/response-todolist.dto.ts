import { ApiOperation, ApiProperty } from "@nestjs/swagger";

export class ResponseTodolistDto {
    @ApiProperty({ description: 'Todolist title' })
    title: string;

    @ApiProperty({ description: 'Todolist status' })
    status: boolean;
}
