import { ApiProperty } from "@nestjs/swagger";


export class ResponseUserMeDto {
    @ApiProperty({ description: 'username of user' })
    username: string;
}