import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
