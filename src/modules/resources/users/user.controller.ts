import { Controller, Get, Post, Body, UseInterceptors, Version, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto, SignInDto } from './dto/create-user.dto';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';

@Controller({
  path: 'auth',
  version: '1',
})
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Post('/register')
  async signUp(@Body(new ValidationPipe()) body: SignUpDto) {
    return this.UserService.signUp(body);
  }

  @Post('/login')
  async signIn(@Body() body: SignInDto) {
    return this.UserService.signIn(body);
  }

  @Get('/me')
  @UseInterceptors(IdentityInterceptor)
  async findOne() {
    return this.UserService.findOne();
  }
}
