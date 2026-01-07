import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
    @ApiProperty({description: 'bearer token'})
    token: string;
}