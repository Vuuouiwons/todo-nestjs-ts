import { ApiProperty } from '@nestjs/swagger';

export class WrappedResponseDto<T> {
  @ApiProperty({ description: 'Metadata regarding the request' })
  meta: Record<string, any>;

  @ApiProperty({ description: 'The actual response payload' })
  data: T;
}