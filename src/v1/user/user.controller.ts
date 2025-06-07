import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto';

@Controller('')
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Post('register')
  register(@Body() registerBody: RegisterDto) {
    return this.UserService.register(registerBody);
  }

  @Post('login')
  login(@Body() loginBody: LoginDto) {
    return this.UserService.login(loginBody);
  }
}
