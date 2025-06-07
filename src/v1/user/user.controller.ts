import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto';

@Controller('')
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerBody: RegisterDto) {
    return this.UserService.register(registerBody);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginBody: LoginDto) {
    return this.UserService.login(loginBody);
  }
}
