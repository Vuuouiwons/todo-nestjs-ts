import { Controller, Get, Post, Body, UseInterceptors, Version, HttpCode, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto, SignInDto } from './dto/create-user.dto';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/register')
  async signUp(@Body(new ValidationPipe()) body: SignUpDto) {
    return this.userService.signUp(body);
  }

  @Post('/login')
  async signIn(@Body() body: SignInDto) {
    return this.userService.signIn(body);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @UseInterceptors(IdentityInterceptor)
  async findOne(@Req() request) {
    return this.userService.findOne(request.user);
  }
}
