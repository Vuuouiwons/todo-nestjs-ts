import { Controller, Get, Post, Body, UseInterceptors, Version, HttpCode, UseGuards, Req, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ResponseUserMeDto } from './dto/response-user.dto';
import { unauthorizedMessage } from 'src/common/constants';

@ApiUnauthorizedResponse({ description: unauthorizedMessage })
@ApiBearerAuth('access-token')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/me')
  @UseGuards(AuthGuard)
  @UseInterceptors(IdentityInterceptor)
  @ApiOkResponse({
    description: 'get user preference',
    type: ResponseUserMeDto
  })
  async me(@Req() request): Promise<ResponseUserMeDto> {
    return this.userService.userMe(request.user);
  }
}
