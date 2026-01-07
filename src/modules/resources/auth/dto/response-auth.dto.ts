import { ApiProperty } from '@nestjs/swagger';

export class ResponseSignInDto {
    @ApiProperty({description: 'bearer token'})
    token: string;
}