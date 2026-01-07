import { ApiProperty } from '@nestjs/swagger';

export class WrappedErrorReponseDto<T> {
  @ApiProperty({ description: 'Metadata regarding the request' })
  meta: Record<string, any>;

  @ApiProperty({ description: 'Error message' })
  data: T;
}