import { Controller, Get, Post, Body, UseInterceptors, Version, HttpCode, UseGuards, Req, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiConflictResponse
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { SignUpDto, SignInDto } from './dto/create-user.dto';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { User } from 'src/common/database/user.entity';
import { resSignInI } from './interfaces/user.interface';

@Controller({
  path: 'auth',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'register user' })
  @ApiCreatedResponse({ description: 'user registered' })
  @ApiConflictResponse({ description: 'email already registered' })
  @ApiUnprocessableEntityResponse({ description: 'validation failed' })
  async signUp(@Body(new ValidationPipe()) body: SignUpDto) {
    return this.userService.signUp(body);
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Body() body: SignInDto): Promise<resSignInI> {
    return this.userService.signIn(body);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @UseInterceptors(IdentityInterceptor)
  async findOne(@Req() request) {
    return this.userService.findOne(request.user);
  }
}
