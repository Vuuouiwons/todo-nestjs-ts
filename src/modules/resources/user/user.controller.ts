import { Controller, Get, Post, Delete, Body, Patch, UseInterceptors, Version, HttpCode, UseGuards, Req, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { IdentityInterceptor } from 'src/interceptors/identity/identity.interceptor';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ResponseUserMeDto } from './dto/response-user.dto';
import { unauthorizedMessage } from 'src/common/constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from 'src/pipes/validation/validation.pipe';
// import { ValidationPipe } from '@nestjs/common';
import { DeleteUserDto } from './dto/delete-user.dto';
import { requestBodyMissingMessage } from 'src/common/constants';
@ApiUnauthorizedResponse({ description: unauthorizedMessage })
@ApiBearerAuth('access-token')
@ApiBadRequestResponse({ description: requestBodyMissingMessage })
@UseGuards(AuthGuard)
@UseInterceptors(IdentityInterceptor)
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/me')
  @ApiOkResponse({
    description: 'get user preference',
    type: ResponseUserMeDto
  })
  async me(@Req() request): Promise<ResponseUserMeDto> {
    return this.userService.userMe(request.user);
  }

  @Patch()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'User preference updated' })
  async update(
    @Req() request,
    @Body(new ValidationPipe()) body: UpdateUserDto
  ): Promise<ResponseUserMeDto> {
    return this.userService.updateUser(request.user, body)
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({ description: 'Confirmation username does not match' })
  async delete(
    @Req() request,
    @Body(new ValidationPipe()) body: DeleteUserDto,
  ): Promise<void> {
    return this.userService.deleteUser(request.user, body)
  }
}
