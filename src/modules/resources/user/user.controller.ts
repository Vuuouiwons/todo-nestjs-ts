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
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/me')
  @UseGuards(AuthGuard)
  @UseInterceptors(IdentityInterceptor)
  async findOne(@Req() request) {
    return this.userService.userMe(request.user);
  }
}
